# Based on google-sheet-student-project-attribution
# https://gitlab.forge.hefr.ch/jacques.supcik/google-sheet-student-project-attribution/
# Original : Jacques Supcik, HEIA-FR
# Adapted  : Yann Doudin, HEIA-FR

from __future__ import print_function
from ortools.linear_solver import pywraplp
import sys, json

def varName(prefix, r, c):
    if r < 10:
        strr = "0" + str(r)[-1:]
    else :
        strr = str(r)[-2:]
    if c < 10 :
        strc = "0" + str(c)[-1:]
    else :
        strc = str(c)[-2:]
    return "{0}_{1}_{2}".format(prefix, strr, strc)

def duoOK(r, c, smax, pmax):
    return smax[c] == 2 and pmax[r] == 2

def main():
    MIN_PROFS = 0
    MAX_PROFS = 6
    # Create the linear solver with the GLOP backend.
    engine = pywraplp.Solver('solver_linear_engine', pywraplp.Solver.GLOP_LINEAR_PROGRAMMING)
    objective = engine.Objective()
    # Get arguments as objects
    randomp = json.loads(sys.argv[1])
    randoms = json.loads(sys.argv[2])
    data    = json.loads(sys.argv[3])
    smax    = json.loads(sys.argv[4])
    pmax    = json.loads(sys.argv[5])
    nbOfStudents    = json.loads(sys.argv[6])
    nbOfProjects    = json.loads(sys.argv[7])

    f = [[0 for x in range(len(randoms))] for y in range(len(randomp))]
    h = [[0 for x in range(len(randoms))] for y in range(len(randomp))]

    for r in randomp :
        for c in randoms :
            if data[r][c] > 0 :
                name = varName("f", r, c)
                f[r][c] = engine.NumVar(0, 1, name)
                objective.SetCoefficient(f[r][c], data[r][c])
                if(duoOK(r, c, smax, pmax)):
                    name = varName("h", r, c)
                    h[r][c] = engine.NumVar(0, 1, name)
                    objective.SetCoefficient(h[r][c], data[r][c] * 1.0) #change coefficient if needed
    
    # constraint 1 : max 1 project per student.
    for c in randoms :
        constraint = engine.Constraint(0, 1)
        for r in randomp :
            if data[r][c] > 0 :
                name = varName("f", r, c)
                constraint.SetCoefficient(f[r][c], 1)
                if duoOK(r, c, smax, pmax) :
                    name = varName("h", r, c)
                    constraint.SetCoefficient(h[r][c], 1)
    
    # constraint 2 : max students per project
    for r in randomp :
        constraint = engine.Constraint(1, 1)
        for c in randoms :
            if data[r][c] > 0 :
                name = varName("f", r, c)
                constraint.SetCoefficient(f[r][c], 1)
                if duoOK(r,c,smax,pmax) :
                    name = varName("h", r, c)
                    constraint.SetCoefficient(h[r][c], 0.5)
        # Add a NotTaken variable
        name = varName("x", r, 0)
        x = engine.NumVar(0, 1, name)
        constraint.SetCoefficient(x, 1)
    
    # constraint 3 : max project per prof
    # NEED TO BE IMPLEMENTED

    objective.SetMaximization()
    status = engine.Solve()

    # print true if solution found
    solutionFound = (status == engine.OPTIMAL)
    print(solutionFound)
    # print value (highest it is, better the attribution is)
    print(objective.Value())
    if solutionFound :
        for r in range(0,nbOfProjects) :
            for c in range(0,nbOfStudents) :
                if data[r][c] > 0 :
                    name = f[r][c]
                    if name.solution_value() > 0 :
                        data[r][c] *= 10
                    else :
                        data[r][c] = 0
                        
                     #   if not duoOK(r, c, smax, pmax)  :
                     #       print('DUO NOT OKAY :')
                     #       nameh = h[r][c]
                     #       print('smax[c] = ', smax[c])
                     #       print('pmax[r] = ', pmax[r])
                     #       print('h[r][c] = ', h[r][c])
                    #if duoOK(r, c, smax, pmax):
                        
    print('aa', data)

if __name__ == '__main__':
    main()