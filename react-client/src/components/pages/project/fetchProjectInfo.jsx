
export default class Action {

    static async fetchAroundInfo(projectState, token, authContainer) {
        await authContainer.setLoading(true);
        fetch('/api/aroundInfo', {
            credentials: 'include',
            method: 'GET',
            headers: new Headers({
                'Content-Type': 'application/json',
                'token': `Bearer ${token}`,
            })
        }).then(function (res) {
            var status = res.status;
            if (status === 420) authContainer.logout();
            else if (status === 200) {
                res.json()
                    .then(function (json) {
                        projectState.setProjectState(json.sections, json.types);
                        authContainer.setNewToken(json.token);
                    })

            } else {
                console.log("autre erruer lors du fetch des info around")
            }
        })

    }

    static async fetchAroundStudent(searchString, token, projectState, authContainer) {
        fetch('/api/studentSearch', {
            credentials: 'include',
            method: 'GET',
            headers: new Headers({
                'Content-Type': 'application/json',
                'token': `Bearer ${token}`,
                'search': searchString
            })
        }).then(function (res) {
            var status = res.status;
            if (status === 420) authContainer.logout();
            else if (status === 200) {
                res.json()
                    .then(function (json) {
                        projectState.setStudentState(json.students);
                        authContainer.setNewToken(json.token);
                    })
            } else {
                console.log("autre erruer lors du fetch des info around")
            }

        })

    }

    static async fetchAroundResp(searchString, token, projectState, authContainer) {
        fetch('/api/respSearch', {
            credentials: 'include',
            method: 'GET',
            headers: new Headers({
                'Content-Type': 'application/json',
                'token': `Bearer ${token}`,
                'search': searchString
            })
        }).then(function (res) {
            var status = res.status;
            if (status === 420) authContainer.logout();
            else if (status === 200) {
                res.json()
                    .then(function (json) {
                        projectState.setRespState(json.resp);
                        authContainer.setNewToken(json.token);
                    })
            } else {
                console.log("autre erruer lors du fetch des info around")
            }

        })

    }

    static async fetchAroundRespExt(searchString, token, projectState, authContainer) {
        console.log("IN ACTIOn searching for resp interne")
        fetch('/api/externeSearch', {
            credentials: 'include',
            method: 'GET',
            headers: new Headers({
                'Content-Type': 'application/json',
                'token': `Bearer ${token}`,
                'search': searchString
            })
        }).then(function (res) {
            var status = res.status;
            if (status === 420) authContainer.logout();
            else if (status === 200) {
                res.json()
                    .then(function (json) {
                        projectState.setRespExtState(json.externes);
                        authContainer.setNewToken(json.token);
                    })
            } else {
                console.log("autre erruer lors du fetch des info around")
            }

        })

    }


    static async createExterne(externe, token, authContainer) {
        const res = fetch('/api/newExterne', {
            method: 'POST',
            headers: new Headers({
                'Content-Type': 'application/json',
                'token': `Bearer ${token}`,
            }),
            body: JSON.stringify({
                externe: externe
            })
        }).then(function (res) {
            var status = res.status;
            if (status === 420) authContainer.logout();
            else if (status === 200) {
                // need to show success to user
                console.log("externe added")
            } else {
                console.log("autre erreur ")
            }
        })
    }

    static async fetchAroundExpert(searchString, token, projectState, authContainer) {
        fetch('/api/expertSearch', {
            credentials: 'include',
            method: 'GET',
            headers: new Headers({
                'Content-Type': 'application/json',
                'token': `Bearer ${token}`,
                'search': searchString
            })
        }).then(function (res) {
            var status = res.status;
            if (status === 420) authContainer.logout();
            else if (status === 200) {
                res.json()
                    .then(function (json) {
                        console.log("RECEIVED EXPERTS :" + json.experts)
                        projectState.setExpertState(json.experts);
                        authContainer.setNewToken(json.token);
                    })
            } else {
                console.log("autre erruer lors du fetch des info around")
            }

        })

    }

    static async fetchAroundTag(searchString, token, projectState, authContainer) {
        fetch('/api/tagSearch', {
            credentials: 'include',
            method: 'GET',
            headers: new Headers({
                'Content-Type': 'application/json',
                'token': `Bearer ${token}`,
                'search': searchString
            })
        }).then(function (res) {
            var status = res.status;
            if (status === 420) authContainer.logout();
            else if (status === 200) {
                res.json()
                    .then(function (json) {
                        console.log("RECEIVED TAGS :" + json.tags)
                        projectState.setTagState(json.tags);
                        authContainer.setNewToken(json.token);
                    })
            } else {
                console.log("autre erruer lors du fetch des info around")
            }

        })

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
            if (status === 420) authContainer.logout();
            else if (status === 200) {
                // need to show success to user
                console.log("project added") 
            } else {
                console.log("autre erreur ")
            }
        })
    }
}