export default class Action {

    static async fetchAroundInfo(attributionContainer, token, authContainer) {
        await authContainer.setLoading(true);
        fetch('/api/aroundInfo', {
            credentials: 'include',
            method: 'GET',
            headers: new Headers({
                'Content-Type': 'application/json',
                'token': `Bearer ${token}`,
            })
        }).then(function (res) {
            authContainer.setLoading(false);
            var status = res.status;
            if (status === 420) authContainer.logout();
            else if (status === 200) {
                res.json()
                    .then(function (json) {
                        attributionContainer.setAttributionState(json.sections, json.types);
                        authContainer.setNewToken(json.token);
                    })

            } else {
                console.log("autre erruer lors du fetch des info around")
            }
        })

    }
}