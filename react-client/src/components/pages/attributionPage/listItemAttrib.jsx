import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import * as C from "../../../constants";
import { withTranslation } from 'react-i18next';

class AttributionItem extends Component {

    state = {
        checked : !this.props.selected
    }

    // get infos for multiple choices at mounting
    async componentDidMount() {
        const { attributionContainer } = this.props;
        // add this item to the list to save if auto checked
        if(this.props.selected)
            attributionContainer.addToSave([this.props.idStudent, this.props.idProj]);
    }

    handleClick = () => {
        const { attributionContainer } = this.props;
        this.setState({checked : !this.state.checked});
        //console.log("cliecked on checkbox ", this.state.checked)
        if(this.state.checked){
            attributionContainer.addToSave([this.props.idStudent, this.props.idProj]);
        } else {
            attributionContainer.removeToSave([this.props.idStudent, this.props.idProj]);
        }
        console.log("actual to save = " , attributionContainer.state.toSave)
    }

    render() {
        return (

            <div>
                <div className="list-project-item">
                    <div className="list-project-item-main">
                            <input type="checkbox" onChange={this.handleClick} defaultChecked={this.props.selected} disabled={!this.props.selected}/>
                        <div>
                            {this.props.Title} {'(' + this.props.RespName + ') : '} {this.props.Name} {C.attributionPage.Choice.text} {this.props.choiceValue}
                        </div>
                        
                    </div>
                </div>
            </div>



        )
    }
}

export default withTranslation("common")(AttributionItem);