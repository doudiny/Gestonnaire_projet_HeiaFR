import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import * as C from "../../constants";

class ProjectsList extends Component {
    state = {
        checked: false
    }
    
    async componentDidMount() {
        const { projectContainer } = this.props;
        
        
    }

    handleClick = () => {
        const { projectContainer } = this.props;
        if (!this.state.checked) {
            projectContainer.addToSave(this.props.project.ID);
        } else {
            projectContainer.removeToSave(this.props.project.ID);
        }
        this.setState({ checked: !this.state.checked });
    }

    render() {

        return (

            <div>
                <div className="list-project-item">
                    <div className="list-project-item-main">
                        <div className="item-actions-start">
                            {this.props.listOptions.select &&
                                <input type="checkbox" onChange={this.handleClick} />
                            }
                        </div>
                        <Link to={C.subPages.view.path + '/' + this.props.project.ID}>{this.props.project.Title}</Link>
                        <div className="item-actions-end">
                        </div>
                    </div>
                    <div className="list-project-item-more">

                    </div>
                </div>
            </div>



        )
    }
}

export default ProjectsList;