import { Container } from 'unstated';

export default class AuthContainer extends Container {
  state = {
    role: localStorage.getItem('role') || 'Visiteur',
    token: localStorage.getItem('token'),
    username: localStorage.getItem('username'),
    userId: localStorage.getItem('userId'),
    loading: false
  };

  async logout() {
    await this.setState({ role: "Visiteur" });
    await this.setState({ token: "" });
    await this.setState({ loading: false });
    await this.setState({ username: null });
    await this.setState({ userId: null});
    await this.saveState();
  }

  async SetAuthenticateStatus(token, role, username, userId) {
    this.setState({
      role: role,
      token: token,
      username: username,
      userId : userId
    }, () => {
      this.setLoading(false)
      this.saveState();
    })
    
    
  }
  async setNewToken(token){
    this.setState({ token: token}, 
      () => {
        this.setLoading(false);
        this.saveState();
      })
  }

  async setLoading(loading) {
    await this.setState({ loading: loading });
  }

  async saveState() {
    await localStorage.setItem('role', this.state.role);
    await localStorage.setItem('token', this.state.token);
    await localStorage.setItem('username', this.state.username);
    await localStorage.setItem('userId', this.state.userId)
  }

}