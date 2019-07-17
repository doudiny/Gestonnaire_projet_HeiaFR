// Base
import React from 'react';
import PropTypes from 'prop-types';
// Actions to server
import Action from './attributionActionFetch'
// material core
import Select from '@material-ui/core/Select';
import SelectMulti from 'react-select';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import withStyles from '@material-ui/core/styles/withStyles';
import Button from '@material-ui/core/Button';


import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';

import CreatableSelectAsync from 'react-select/lib/AsyncCreatable';
import CreatableSelect from 'react-select/lib/Creatable';
// material icon 


// static var for multiple choices
import { optionsYear } from './../project/dataForm'

class AttributionForm extends React.Component {
    // state for multiple choices

    state = {
        selectedFiliere: [],
        selectedType: [],
        selectedYear: []
    }
    // local references
    myYear = React.createRef()
    myType = React.createRef()


    // get infos for multiple choices at mounting
    async componentDidMount() {
        const { attributionContainer, authContainer } = this.props;
        // wiat that it's totally loaded (normally not needed)
        while (authContainer.state.loading);
        // if infos not loaded
        if (!attributionContainer.state.done) {
            attributionContainer.setDone(true);
            await Action.fetchAroundInfo(attributionContainer, authContainer.state.token, authContainer);
            attributionContainer.setLoading(false);
        }
    }

    

    //---------------------------Choices handling-----------------------------------------------
    //set states filière chosen by user
    handleChangeFiliere = (selectedFiliere) => {
        const { attributionContainer } = this.props;
        this.setState({ selectedFiliere });
        attributionContainer.setSelectedfiliere(selectedFiliere);
    }

    //set states filière chosen by user
    handleChangeType = () => {
        const { attributionContainer } = this.props;
        this.setState({ selectedType : this.myType.value });
        attributionContainer.setSelectedType(this.myType.value);
    }

    //set states year chosen by user
    handleChangeYear = () => {
        const { attributionContainer } = this.props;
        this.setState({ selectedYear : this.myYear.value });
        attributionContainer.setSelectedYear(this.myYear.value);
    }
    //-----------------------------------------------------------------------------------------


    // render HTML
    render() {
        const { classes, attributionContainer } = this.props;
        return (
            <main className={classes.main}>
                <CssBaseline />
                <Paper className={classes.paper}>
                    <form className={classes.form} onSubmit={this.handleSubmit}>
                        <Grid container spacing={24} >
                            <Grid item xs={12} sm={12} md={6} >
                                <FormControl margin="normal" fullWidth>
                                    <InputLabel>Année</InputLabel>
                                    <Select native inputRef={(myYear) => this.myYear = myYear} onChange={this.handleChangeYear} >
                                        {
                                            optionsYear.map(function (item, i) {
                                                return <option key={item.value} value={item.value}>{item.label}</option>
                                            })
                                        }
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={12} md={6} >
                                <FormControl margin="normal" fullWidth>
                                    <InputLabel>Type de projet</InputLabel>
                                    <Select native name="annee" type="text" id="annee" autoComplete="Annee" inputRef={(myType) => this.myType = myType} onChange={this.handleChangeType} >
                                        <option key="" value=""></option>
                                        {
                                            attributionContainer.state.types.map(function (type, i) {
                                                return <option key={type.Name} value={type.Name}>{type.Name} ({type.CreditECTS} credits ECTS)</option>
                                            })
                                        }
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={12} md={6} >
                                <FormControl margin="normal" fullWidth>
                                    <InputLabel>Filière</InputLabel>
                                    <SelectMulti
                                        isMulti
                                        options={attributionContainer.state.filiere.map((fil) => {
                                            return {
                                                value: fil.Name,
                                                label: fil.Name
                                            }
                                        })}
                                        className="basic-multi-select"
                                        classNamePrefix="select"
                                        placeholder="Filière"
                                        onChange={this.handleChangeFiliere} />
                                </FormControl>
                            </Grid>
                        </Grid>
                    </form>
                </Paper>
            </main >
        );
    }
}


// properties verifications


//CSS in JS
const styles = theme => ({
    main: {
        width: 'auto',
        display: 'block', // Regle le problème de IE 11
        marginLeft: theme.spacing.unit * 3,
        marginRight: theme.spacing.unit * 3,
    },
    paper: {
        marginTop: theme.spacing.unit * 8,
        display: 'flex',
        flexDirection: 'row',
        padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
    },
    form: {
        marginTop: theme.spacing.unit,
        flexGrow: 1,
    }
});

// component export with css style
export default withStyles(styles)(AttributionForm);