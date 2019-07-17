import React, { Component } from "react"
import ListItemProject from "./ListItemProject"
import LinearProgress from '@material-ui/core/LinearProgress';
import ReactDragListView from 'react-drag-listview/lib/index.js';
import Divider from '@material-ui/core/Divider';
import { NotificationManager } from 'react-notifications';

class ProjectsList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      projects: [],
      loading: true
    }
    props.filterContainer.state.states = props.state;
    //if(!this.props.projectContainer.state.done){
      this.updateTheList()
    //}
  }

  async updateTheList(){
    if (this.props.state !== ['PUBLIE']) this.props.filterContainer.state.owner = this.props.owner;
    let mybody = {};
    await this.props.projectContainer.setDone(true)
    if (this.props.student > 0) {
      //show own choices
      mybody = {
        studentID: this.props.student
      }
      fetch("/api/choices", {
        method: "POST",
        headers: new Headers({
          "Content-Type": "application/json"
        }),
        body: JSON.stringify(mybody)
      }).then(res => {
        if (res.status === 200) {
          res.json().then(json => {
            this.setState({ projects: json })
          })
        } else {
          NotificationManager.error('Une erreur inconnu est survenu, veullez consulter les log pour plus de détails', 'Errueur', 2000);
        }
      })
    } else {

      mybody = {
        filters: this.props.filterContainer.state
      }
      fetch("/api/projects", {
        method: "POST",
        headers: new Headers({
          "Content-Type": "application/json"
        }),
        body: JSON.stringify(mybody)
      }).then(res => {
        if (res.status === 200) {
          res.json().then(json => {
            this.setState({ projects: json })
            //
          })
        } else {
          NotificationManager.error('Une erreur inconnu est survenu, veullez consulter les log pour plus de détails', 'Erreur', 2000);
        }
      })
    }
    this.setState({ loading: false })
  }

  render() {
    const listOptions = this.props.listOptions
    if(this.props.projectContainer.state.done === false){ 
      this.updateTheList(); 
    }
    const dragProps = {
      onDragEnd: (fromIndex, toIndex) => {
        const { projectContainer } = this.props;
        const projects = this.state.projects;
        const item = projects.splice(fromIndex, 1)[0];
        projects.splice(toIndex, 0, item);
        this.setState({ projects });
        var toSave = [];
        projects.forEach(proj => {
          toSave.push(proj.ID)
        });
        projectContainer.setChoices(toSave)
      },
      nodeSelector: 'li',
      handleSelector: 'a'
    };

    return (
      <div className="list-projects">
        {
          this.state.loading &&
          <div >
            <LinearProgress />
          </div>
        }
        {this.props.student === undefined &&
          this.state.projects.map((p, index) => {
            return <ListItemProject key={p.ID} project={p} listOptions={listOptions} projectContainer={this.props.projectContainer} index={index} studentID={this.props.student} />
          })
        }
        <ReactDragListView {...dragProps}>
          <ol>
            {this.props.student > 0 &&
              this.state.projects.map((p, index) => {
                return (
                  <li key={index}>
                    <a href="#">
                      <ListItemProject key={p.ID} project={p} listOptions={listOptions} projectContainer={this.props.projectContainer} index={index} studentID={this.props.student} nocheck />
                    </a>
                    {index === 2 &&
                      <div>
                        <Divider variant="middle" />
                        <br/>
                      </div>
                    }
                  </li>)
              })
            }
          </ol>
        </ReactDragListView>
      </div>
    )
  }
}


export default ProjectsList
