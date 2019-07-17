import 'react-notifications/lib/notifications.css';
import { NotificationManager } from 'react-notifications';

export default class Action {

    static async launchAttribution(filiere, type, year, token, attributionContainer, authContainer) {
        let filiereStr = [];
        attributionContainer.setLoading(true);
        filiere.forEach(fil => {
            filiereStr.push(fil.value)
        })

        fetch('/api/executeAttribution', {
            credentials: 'include',
            method: 'POST',
            headers: new Headers({
                'Content-Type': 'application/json',
                'token': `Bearer ${token}`,
            }),
            body: JSON.stringify({
                filiere: filiereStr,
                type: type,
                year: year
            })
        }).then(function (res) {
            attributionContainer.setLoading(false);
            var status = res.status;
            if (status === 420) {
                NotificationManager.error('Veulliez-vous re-loguer', 'Token expiré', 2000);
                authContainer.logout();
            }
            else if (status === 450) {
                attributionContainer.setNotFound();
            }
            else if (status === 200) {
                res.json()
                    .then(function (json) {
                        attributionContainer.setProposition(json);
                        //authContainer.setNewToken(json.token);
                    })

            } else {
                NotificationManager.error('Une erreur inconnu est survenu, veullez consulter les log pour plus de détails', 'Errueur', 2000);
                attributionContainer.setNotFound();
            }
        })
    }


    static async confirmAttribution(authContainer, attributionContainer) {
        let token = authContainer.state.token;
        let matrixToSave = attributionContainer.state.toSave;

        if (Object.getOwnPropertyNames(matrixToSave).length <= 0){
            NotificationManager.warning('Veulliez séléctionner au moins un projet', 'Aucun projet séléctionnés', 2000);
            return;
        } 
        fetch('/api/saveAttribution', {
            credentials: 'include',
            method: 'POST',
            headers: new Headers({
                'Content-Type': 'application/json',
                'token': `Bearer ${token}`,
            }),
            body: JSON.stringify({
                attributionMatrix: matrixToSave
            })
        }).then(function (res) {
            var status = res.status;
            if (status === 420) {
                NotificationManager.error('Veulliez-vous re-loguer', 'Token expiré', 2000);
                authContainer.logout();
            } else if (status === 200) {
                res.json()
                    .then(function (json) {
                        attributionContainer.resetAttribution();
                        authContainer.setNewToken(json.token);
                    })

            } else {
                NotificationManager.error('Une erreur inconnu est survenu, veullez consulter les log pour plus de détails', 'Errueur', 2000);
                attributionContainer.setNotFound();
            }
        })
    }

    static async deleteProjects(authContainer, projectContainer) {
        if (projectContainer.state.projectToValidate.length === 0){
            NotificationManager.warning('Veulliez séléctionner au moins un projet', 'Aucun projet séléctionnés', 2000);
            return;
        } 
        let token = authContainer.state.token;
        fetch('/api/deleteProjects', {
            credentials: 'include',
            method: 'DELETE',
            headers: new Headers({
                'Content-Type': 'application/json',
                'token': `Bearer ${token}`,
            }),
            body: JSON.stringify({
                projects: projectContainer.state.projectToValidate
            })
        }).then(function (res) {
            var status = res.status;
            if (status === 420) {
                NotificationManager.error('Veulliez-vous re-loguer', 'Token expiré', 2000);
                authContainer.logout();
            }
            else if (status === 200) {
                res.json()
                    .then(function (json) {
                        NotificationManager.success('Les projets séléctionnés ont été mis à jour', 'Mise à jour', 2000);
                        authContainer.setNewToken(json.token);
                    })
            } else {
                NotificationManager.error('Une erreur inconnu est survenu, veullez consulter les log pour plus de détails', 'Errueur', 2000);
            }
        })
    }

    static async removeFromChoices(authContainer, projectContainer) {
        if (projectContainer.state.projectToValidate.length === 0){
            NotificationManager.warning('Veulliez séléctionner au moins un projet', 'Aucun projet séléctionnés', 2000);
            return;
        } 
        let token = authContainer.state.token;
        fetch('/api/deleteChoices', {
            credentials: 'include',
            method: 'DELETE',
            headers: new Headers({
                'Content-Type': 'application/json',
                'token': `Bearer ${token}`,
            }),
            body: JSON.stringify({
                projects: projectContainer.state.projectToValidate
            })
        }).then(function (res) {
            var status = res.status;
            if (status === 420) {
                NotificationManager.error('Veulliez-vous re-loguer', 'Token expiré', 2000);
                authContainer.logout();
            }
            else if (status === 200) {
                res.json()
                    .then(function (json) {
                        NotificationManager.success('Les projets séléctionnés ont été retiré des choix', 'Mise à jour', 2000);
                        authContainer.setNewToken(json.token);
                    })
            } else {
                NotificationManager.error('Une erreur inconnu est survenu, veullez consulter les log pour plus de détails', 'Errueur', 2000);
            }
        })
    }

    static async addToChoices(authContainer, projectContainer) {
        if (projectContainer.state.projectToValidate.length === 0){
            NotificationManager.warning('Veulliez séléctionner au moins un projet', 'Aucun projet séléctionnés', 2000);
            return;
        } 
        let token = authContainer.state.token;
        let body = [];
        projectContainer.state.projectToValidate.forEach(oneProj => {
            body.push({
                ProjectID: oneProj,
                UserID: authContainer.state.userId,
                Weight: 0
            })
        })
        fetch('/api/addToChoices', {
            credentials: 'include',
            method: 'PUT',
            headers: new Headers({
                'Content-Type': 'application/json',
                'token': `Bearer ${token}`,
            }),
            body: JSON.stringify(body)
        }).then(function (res) {
            var status = res.status;
            if (status === 420) {
                NotificationManager.error('Veulliez-vous re-loguer', 'Token expiré', 2000);
                authContainer.logout();
            }
            else if (status === 200) {
                res.json()
                    .then(function (json) {
                        authContainer.setNewToken(json.token);
                        NotificationManager.success('Les projets séléctionnés ont été ajoutés aux choix', 'Mise à jour', 2000);
                    })

            } else if (status === 201) {
                NotificationManager.warning('Vous ne pouvez pas choisir un projet qui est déjà dans vos choix', 'Project déjà choisi', 2000);
            } else {
                NotificationManager.error('Une erreur inconnu est survenu, veullez consulter les log pour plus de détails', 'Errueur', 2000);
            }
        })
    }

    static async updateChoices(authContainer, projectContainer) {
        if (projectContainer.state.choices.length === 0){
            NotificationManager.warning('Veulliez avoir au moins 1 projets dans vos choix', 'Aucun projet choisi', 2000);
            return;
        } 
        if (projectContainer.state.choices.length < 3){
            NotificationManager.warning('Il est préférable de choisir au moins 3 projets', 'Nombre de choix faible', 2000);
        } 
        let token = authContainer.state.token;
        let body = [];
        for(let i = 0; i < projectContainer.state.choices.length; i++){
            if(i >= 3) break;
            body.push({
                ProjectID: projectContainer.state.choices[i],
                UserID: authContainer.state.userId,
                Weight: (3-i)
            })
        }
        fetch('/api/updateChoices', {
            credentials: 'include',
            method: 'PUT',
            headers: new Headers({
                'Content-Type': 'application/json',
                'token': `Bearer ${token}`,
            }),
            body: JSON.stringify(body)
        }).then(function (res) {
            var status = res.status;
            if (status === 420) {
                NotificationManager.error('Veulliez-vous re-loguer', 'Token expiré', 2000);
                authContainer.logout();
            }
            else if (status === 200) {
                res.json()
                    .then(function (json) {
                        authContainer.setNewToken(json.token);
                        NotificationManager.success('Vos choix ont étés enregistrés dans le système', 'Mise à jour', 2000);
                    })

            } else if (status === 201) {
                NotificationManager.warning('Vous ne pouvez pas choisir un projet qui est déjà dans vos choix', 'Project déjà choisi', 2000);
            } else {
                NotificationManager.error('Une erreur inconnu est survenu, veullez consulter les log pour plus de détails', 'Errueur', 2000);
            }
        })
    }

    static async updateProjects(authContainer, projectContainer, nextState) {
        if (projectContainer.state.projectToValidate.length === 0){
            NotificationManager.error('Veulliez séléctionner au moins un projet', 'Aucun projet séléctionnés', 2000);
            return;
        } 
        let token = authContainer.state.token
        fetch('/api/updateProjects', {
            credentials: 'include',
            method: 'PUT',
            headers: new Headers({
                'Content-Type': 'application/json',
                'token': `Bearer ${token}`,
            }),
            body: JSON.stringify({
                projects: projectContainer.state.projectToValidate,
                nextState: nextState
            })
        }).then(function (res) {
            var status = res.status;
            if (status === 420) {
                NotificationManager.error('Veulliez-vous re-loguer', 'Token expiré', 2000);
                authContainer.logout();
            }
            else if (status === 200) {
                res.json()
                    .then(function (json) {
                        NotificationManager.success('Les projets séléctionnés ont été mis à jour', 'Mise à jour', 2000);
                        authContainer.setNewToken(json.token);
                    })

            } else {
                NotificationManager.error('Une erreur inconnu est survenu, veullez consulter les log pour plus de détails', 'Errueur', 2000);
            }
        })
    }

    static async saveProject(authContainer, projectContainer) {

        var studentUpdater = [];
        var expertsUpdater = [];
        var respInterneUpdater = [];
        var respExterneUpdater = [];
        var filiereUpdater = [];
        var tagUpdater = [];
        var linkUpdater = [];

        // init the array of students to be updated (adding their project assigned)
        for (var i = 0; i < projectContainer.state.newProject.student.length; i++) {
            studentUpdater.push({ ID: projectContainer.state.newProject.student[i].value });
        }
        //studentUpdater = (studentUpdater.length > 0) ? studentUpdater : null;

        // init the array of experts to be assigned to this project
        for (var i = 0; i < projectContainer.state.newProject.experts.length; i++) {
            expertsUpdater.push({ ExpertID: projectContainer.state.newProject.experts[i].value });
        }
        //expertsUpdater = (expertsUpdater.length > 0) ? expertsUpdater : null;
        // init the array of responsable interne to be assigned to this project
        for (var i = 0; i < projectContainer.state.newProject.respInterne.length; i++) {
            respInterneUpdater.push({ UserID: projectContainer.state.newProject.respInterne[i].value });
        }
        //respInterneUpdater = (respInterneUpdater.length > 0) ? respInterneUpdater : null;
        // init the array of responsable externe to be assigned to this project
        for (var i = 0; i < projectContainer.state.newProject.respExterne.length; i++) {
            respExterneUpdater.push({ ExterneID: projectContainer.state.newProject.respExterne[i].value });
        }
        //respExterneUpdater = (respExterneUpdater.length > 0) ? respExterneUpdater : null;
        // init the array of filiere externe to be assigned to this project
        for (var i = 0; i < projectContainer.state.newProject.filiere.length; i++) {
            filiereUpdater.push({ SectionName: projectContainer.state.newProject.filiere[i].value });
        }
        //filiereUpdater = (filiereUpdater.length > 0) ? filiereUpdater : null;
        // init the array of key word (tags) externe to be assigned to this project
        for (var i = 0; i < projectContainer.state.newProject.tags.length; i++) {
            // ou Word s'il n'existe pas ... !!! à vériier sur le server
            tagUpdater.push({ KeyWordsWord: projectContainer.state.newProject.tags[i].value });
        }
        //tagUpdater = (tagUpdater.length > 0) ? tagUpdater : null;
        // init the array of links externe to be assigned to this project
        for (var i = 0; i < projectContainer.state.newProject.links.length; i++) {
            linkUpdater.push({ LinkAndRefLink: projectContainer.state.newProject.links[i].value });
        }
        //linkUpdater = (linkUpdater.length > 0) ? linkUpdater : null;

        var newProject = JSON.stringify({
            Title: projectContainer.state.newProject.title,
            Description: projectContainer.state.newProject.desc,
            Abreviation: projectContainer.state.newProject.abrev,
            NbrMaxStudent: projectContainer.state.newProject.nbrStudent,
            Year: projectContainer.state.newProject.year,
            ClientName: projectContainer.state.newProject.mandant,
            Language: projectContainer.state.newProject.language,
            TypeName: projectContainer.state.newProject.type
        }).replace(/\"\"/g, "null");
        this.createProject(studentUpdater, expertsUpdater, respInterneUpdater, respExterneUpdater, filiereUpdater, tagUpdater, linkUpdater, newProject, authContainer.state.token, authContainer)

    }

    static async createProject(studentUpdater, expertsUpdater, respInterneUpdater, respExterneUpdater, filiereUpdater, tagUpdater, linkUpdater, newProject, token, authContainer) {

        const res = fetch('/api/newProject', {
            method: 'POST',
            headers: new Headers({
                'Content-Type': 'application/json',
                'token': `Bearer ${token}`,
            }),
            body: JSON.stringify({
                studentUpdater: studentUpdater,
                expertsUpdater: expertsUpdater,
                respInterneUpdater: respInterneUpdater,
                respExterneUpdater: respExterneUpdater,
                filiereUpdater: filiereUpdater,
                tagUpdater: tagUpdater,
                linkUpdater: linkUpdater,
                newProject: newProject
            })
        }).then(function (res) {
            var status = res.status;
            if (status === 420) {
                NotificationManager.error('Veulliez-vous re-loguer', 'Token expiré', 2000);
                authContainer.logout();
            }
            else if (status === 200) {
                NotificationManager.success('Le projet à été enregistré en saisie', 'Projet Enregistré', 2000);
            } else {
                NotificationManager.error('Une erreur inconnu est survenu, veullez consulter les log pour plus de détails', 'Errueur', 2000);
            }
        })
    }

    static async declineAttribution(attributionContainer) {
        attributionContainer.resetAttribution();
    }
}