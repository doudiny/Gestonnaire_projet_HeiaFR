import React, { Component } from "react"
import AttributionItem from "./listItemAttrib"
import LinearProgress from '@material-ui/core/LinearProgress';
import Snackbar from '@material-ui/core/Snackbar';

class AttributionList extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { attributionContainer } = this.props;
    return (
      < div className="list-projects" >

        {
          (!attributionContainer.state.found || attributionContainer.state.proposition.length <= 0)
            && !attributionContainer.state.loading &&
          <div>Attribution failed</div>
        }
        {
          attributionContainer.state.loading &&
          <div >
            <LinearProgress />
          </div>
        }
        {attributionContainer.state.found &&
          attributionContainer.state.proposition.map(p => {
            if(p[5] === 0) return <AttributionItem attributionContainer={attributionContainer} key={p[0] + p[2]} idProj={p[0]} idStudent={p[2]} Title={p[1]} Name={p[3]} RespName={p[4]} choiceValue={p[5]} selected={false} sol={true} />
            else {
              return <AttributionItem attributionContainer={attributionContainer} key={p[0] + p[2]} Title={p[1]} idProj={p[0]} idStudent={p[2]} Name={p[3]} RespName={p[4]} choiceValue={p[5]} selected={true} sol={true} />
            }
          })
        }
      </div >
    )
  }
}

export default AttributionList;