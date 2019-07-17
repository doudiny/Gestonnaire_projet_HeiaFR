import { Container } from 'unstated';

export default class AttributionContainer extends Container {
  state = {
    filiere: [],
    types: [],
    selectedFiliere: [],
    selectedTypes: '',
    selectedYear: '',
    done: false,
    loading: false,
    found: true,
    proposition: [],
    toSave:[]
  };

  async setAttributionState(filiere, types) {
    await this.setState({ filiere: filiere });
    await this.setState({ types: types });
    await this.setState({ done: true });
  }

  async setProposition(proposition) {
    await this.setState({ proposition: proposition });
    await this.setState({ found: true });
    await this.setState({ loading: false });
  }

  async setSelectedfiliere(filiere) {
    await this.setState({ selectedFiliere: filiere });
  }

  async setNotFound() {
    await this.setState({ found: false });
  }

  async setSelectedType(type) {
    await this.setState({ selectedTypes: type });
  }

  async setSelectedYear(year) {
    await this.setState({ selectedYear: year });
  }

  async launchAttribution() {
    await this.setState({ loading: true });
  }

  setDone(done) {
    this.setState({ done: done });
  }

  async setLoading(loading) {
    this.setState({ loading: loading });
  }

  async setToSave(toSave) {
    await this.setState({ toSave: toSave });
  }

  async addToSave(oneToSave) {
    for(var i = 0; i < this.state.toSave.length; i++){
      if(this.state.toSave[i].toString() === oneToSave.toString()){
        return;
      }
    }
    await this.state.toSave.push(oneToSave)
  }
  async removeToSave(oneToRem) {
    for(var i = 0; i < this.state.toSave.length ; i++){
      if(this.state.toSave[i].toString() === oneToRem.toString()){
        await this.state.toSave.splice(i, 1);
      }
    }
  }

  resetAttribution() {
    this.setState({
      selectedFiliere: [],
      selectedTypes: '',
      selectedYear: '',
      done: false,
      loading: false,
      found: true,
      proposedResultStr: {},
      proposedResultID: {},
      optimisationNumber: 0
    });
  }

}