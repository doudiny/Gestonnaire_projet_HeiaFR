// Base
import React from 'react';
import PropTypes from 'prop-types';
// Actions to server
import Action from './fetchProjectInfo';
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
import { optionsNbrMaxStudent, optionsYear, optionsLangue } from './dataForm'

class ProjectForm extends React.Component {
    // state for multiple choices

    state = {
        selectedFiliere: [],
        selectedStudent: [],
        selctedRespInterne: [],
        selctedRespExterne: [],
        selectedExperts: [],
        selectedTags: [],
        selectedLinks: [],
        newExterneOpen: false
    }
    // local references
    myTitle = React.createRef()
    myAbrev = React.createRef()
    myYear = React.createRef()
    myNbrStudent = React.createRef()
    myLang = React.createRef()
    myMandant = React.createRef()
    myDesc = React.createRef()
    myType = React.createRef()
    // experts references
    extName = React.createRef()
    extEmail = React.createRef()
    extPhoneNumber = React.createRef()


    // get infos for multiple choices at mounting
    async componentDidMount() {
        const { projectContainer, authContainer } = this.props;
        // wiat that it's totally loaded (normally not needed)
        while (authContainer.state.loading);
        // if infos not loaded
        if (!projectContainer.state.done) {
            projectContainer.setDone(true);
            await Action.fetchAroundInfo(projectContainer, authContainer.state.token, authContainer);
            authContainer.setLoading(false);
        }
    }

    // verify links entred
    validURL = (str) => {
        console.log("verifying URL : " + str)
        var pattern = new RegExp("((http|https)(:\/\/))?([a-zA-Z0-9]+[.]{1}){2}[a-zA-z0-9]+(\/{1}[a-zA-Z0-9]+)*\/?", "i");

        return !(pattern.exec(str) == null || pattern.exec(str).index > 0)
    }

    //------------------------------Extern handling------------------------------
    handleClickExterneOpen = () => {
        this.setState({ newExterneOpen: true });
    };

    handleExterneClose = () => {
        this.setState({ newExterneOpen: false });
    };

    createExterne = (e) => {
        const { authContainer } = this.props;
        e.preventDefault(); // prevent page refresh on submit
        var newExterne = JSON.stringify({
            Name: this.extName.value,
            Email: this.extEmail.value,
            Number: this.extPhoneNumber.value
        });
        Action.createExterne(newExterne, authContainer.state.token, authContainer)
        this.handleExterneClose()
    }
    //--------------------------------------------------------------------------------------


    //--------------------Multi-choices handling-------------------------
    //set states filière chosen by user
    handleChangeFiliere = (selectedFiliere) => {
        const {projectContainer} = this.props;
        projectContainer.setNewFiliere(selectedFiliere);
        this.setState({ selectedFiliere });
    }

    // handle searching student
    handleSearchStudent = (studentSearch, e) => {
        if (e.action === 'input-change' && studentSearch !== '') {
            const { projectContainer, authContainer } = this.props;
            Action.fetchAroundStudent(studentSearch, authContainer.state.token, projectContainer, authContainer);
        }
    }

    // set state student chosen
    handleChangeStudent = (selectedStudent) => {
        const {projectContainer} = this.props;
        projectContainer.setNewStudent(selectedStudent);
        this.setState({ selectedStudent });
    }

    // set state Repsonables interne chosen
    handleChangeResp = (selctedRespInterne) => {
        const {projectContainer} = this.props;
        projectContainer.setNewRespInterne(selctedRespInterne);
        this.setState({ selctedRespInterne });
    }

    // handle search for responsable interne
    handleSearchResp = (respSearch, e) => {
        if (e.action === 'input-change' && respSearch !== '') {
            const { projectContainer, authContainer } = this.props;
            Action.fetchAroundResp(respSearch, authContainer.state.token, projectContainer, authContainer);
        }
    }

    // set state Repsonables externe chosen 
    handleChangeRespExt = (selctedRespExterne) => {
        const {projectContainer} = this.props;
        projectContainer.setNewRespExterne(selctedRespExterne);
        this.setState({ selctedRespExterne });
    }

    // handle search responsable externe
    handleSearchRespExt = (respSearch, e) => {
        if (e.action === 'input-change' && respSearch !== '') {
            const { projectContainer, authContainer } = this.props;
            Action.fetchAroundRespExt(respSearch, authContainer.state.token, projectContainer, authContainer);
        }
    }

    // set state experts chosen
    handleChangeExpert = (selectedExperts) => {
        const {projectContainer} = this.props;
        projectContainer.setNewExpert(selectedExperts);
        this.setState({ selectedExperts });
    }

    // handle search experts
    handleSearchExpert = (expertSearch, e) => {
        if (e.action === 'input-change' && expertSearch !== '') {
            const { projectContainer, authContainer } = this.props;
            Action.fetchAroundExpert(expertSearch, authContainer.state.token, projectContainer, authContainer);
        }
    }

    // set state tags chosen
    handleChangeTag = (selectedTags) => {
        const {projectContainer} = this.props;
        projectContainer.setNewTags(selectedTags);
        this.setState({ selectedTags });
    }

    // handle search for tags
    handleSearchTag = (tagSearch, e) => {
        if (e.action === 'input-change' && tagSearch !== '') {
            const { projectContainer, authContainer } = this.props;
            Action.fetchAroundTag(tagSearch, authContainer.state.token, projectContainer, authContainer);
        }
    }

    // set state link chosen
    handleChangeLink = (selectedLinks) => {
        const {projectContainer} = this.props;
        var allowedLinks = selectedLinks.map((link) => {
            if (this.validURL(link.value)) {
                return link
            }
        })
        projectContainer.setNewLink(allowedLinks);
        this.setState({ selectedLinks: allowedLinks });
    }

    //-----------------------------------------------------------------------------------------


    // render HTML
    render() {
        const { classes, projectContainer } = this.props;
        return (
            <main className={classes.main}>
                <CssBaseline />
                <Paper className={classes.paper}>
                    <form className={classes.form} onSubmit={this.handleSubmit}>
                        <FormControl margin="normal" fullWidth>
                            <InputLabel >Titre</InputLabel>
                            <Input id="title" type="text" name="title" autoComplete="Titre" autoFocus inputRef={(myTitle) => this.myTitle = myTitle} onChange={(title) => projectContainer.setNewTitle(title.target.value)} />
                        </FormControl>
                        <FormControl margin="normal" fullWidth>
                            <InputLabel>Abréviation</InputLabel>
                            <Input name="abrev" type="text" id="abrev" autoComplete="Abréviation" inputRef={(myAbrev) => this.myAbrev = myAbrev} onChange={(abrev) => projectContainer.setNewAbrev(abrev.target.value)} />
                        </FormControl>
                        <Grid container spacing={24} >
                            <Grid item xs={12} sm={12} md={6} >
                                <FormControl margin="normal" fullWidth>
                                    <InputLabel>Année</InputLabel>
                                    <Select native inputRef={(myYear) => this.myYear = myYear} onChange={(year) => projectContainer.setNewYear(year.target.value)} >
                                        {
                                            optionsYear.map(function (item, i) {
                                                console.log(JSON.stringify(item))
                                                return <option key={item.value} value={item.value}>{item.label}</option>
                                            })
                                        }
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={12} md={6} >
                                <FormControl margin="normal" fullWidth>
                                    <InputLabel>Nombre max. d'étudiants</InputLabel>
                                    <Select native inputRef={(myNbrStudent) => this.myNbrStudent = myNbrStudent} onChange={(nbrStudent) => projectContainer.setNewNbrStudent(nbrStudent.target.value)} >
                                        {
                                            optionsNbrMaxStudent.map(function (item, i) {
                                                console.log(JSON.stringify(item))
                                                return <option key={item.value} value={item.value}>{item.label}</option>
                                            })
                                        }

                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={12} md={6} >
                                <FormControl margin="normal" fullWidth>
                                    <InputLabel>Type de projet</InputLabel>
                                    <Select native name="annee" type="text" id="annee" autoComplete="Annee" inputRef={(myType) => this.myType = myType} onChange={(type) => projectContainer.setNewType(type.target.value)} >
                                        <option key="" value=""></option>
                                        {
                                            projectContainer.state.types.map(function (type, i) {
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
                                        options={projectContainer.state.filiere.map((fil) => {
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
                        <Grid container spacing={24} >
                            <Grid item xs={12} sm={12} md={6} >
                                <FormControl margin="normal" fullWidth>
                                    <InputLabel>Langue</InputLabel>
                                    <Select native name="langue" type="text" id="langue" autoComplete="Langue" inputRef={(myLang) => this.myLang = myLang} onChange={(language) => projectContainer.setNewLanguage(language.target.value)} >
                                        {
                                            optionsLangue.map(function (item, i) {
                                                return <option key={item.value} value={item.value}>{item.label}</option>
                                            })
                                        }
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={12} md={6} >
                                <FormControl margin="normal" fullWidth>
                                    <InputLabel>Mandant</InputLabel>
                                    <Input name="mandant" type="text" id="mandant" autoComplete="Mandant" inputRef={(myMandant) => this.myMandant = myMandant} onChange={(mandant) => projectContainer.setNewMandant(mandant.target.value)} />
                                </FormControl>
                            </Grid>
                        </Grid>
                        <FormControl margin="normal" fullWidth>
                            <InputLabel>Description</InputLabel>
                            <Input multiline name="description" type="text" id="description" autoComplete="Description" inputRef={(myDesc) => this.myDesc = myDesc} onChange={(desc) => projectContainer.setNewDesc(desc.target.value)} />
                        </FormControl>
                        <FormControl margin="normal" fullWidth>
                            <InputLabel>Etudiant</InputLabel>
                            <SelectMulti
                                isMulti
                                options={projectContainer.state.studentSearchin.map((stu) => {
                                    return {
                                        value: stu.ID,
                                        label: stu.Name + " " + stu.FirstName
                                    }
                                })}
                                placeholder="Etudiants (Attribution manuelle)"
                                onInputChange={this.handleSearchStudent}
                                onChange={this.handleChangeStudent}
                            />
                        </FormControl>
                        <FormControl margin="normal" fullWidth>
                            <InputLabel>Responsables Interne</InputLabel>
                            <SelectMulti
                                isMulti
                                options={projectContainer.state.respSearchin.map((resp) => {
                                    return {
                                        value: resp.ID,
                                        label: resp.Name + " " + resp.FirstName
                                    }
                                })}
                                placeholder="Responsables Interne"
                                onInputChange={this.handleSearchResp}
                                onChange={this.handleChangeResp}
                            />
                        </FormControl>
                        <FormControl margin="normal" fullWidth>
                            <InputLabel>Responsables Externe</InputLabel>
                            <SelectMulti
                                isMulti
                                options={projectContainer.state.respExtSearchin.map((resp) => {
                                    return {
                                        value: resp.ID,
                                        label: resp.Name
                                    }
                                })}
                                placeholder="Responsables Externe"
                                onInputChange={this.handleSearchRespExt}
                                onChange={this.handleChangeRespExt}
                            />
                            <Button onClick={this.handleClickExterneOpen}>Nouveau responsable externe</Button>
                            <Dialog
                                open={this.state.newExterneOpen}
                                onClose={this.handleClose}
                                aria-labelledby="form-dialog-title"
                            >

                                <form className={classes.form} onSubmit={this.createExterne}>
                                    <DialogTitle id="form-dialog-title">Ajouter un responsable externe</DialogTitle>
                                    <DialogContent>
                                        <DialogContentText>
                                            Veuillez remplire les informations suivante pour ajouter un nouveau responsable externe
                                    </DialogContentText>
                                        <TextField
                                            autoFocus
                                            margin="dense"
                                            id="name"
                                            label="Nom"
                                            type="text"
                                            fullWidth
                                            required
                                            inputRef={(extName) => this.extName = extName}
                                        />
                                        <TextField
                                            autoFocus
                                            margin="dense"
                                            id="email"
                                            label="Adresse email"
                                            type="email"
                                            fullWidth
                                            required
                                            inputRef={(extEmail) => this.extEmail = extEmail}
                                        />

                                        <TextField
                                            autoFocus
                                            margin="dense"
                                            id="name"
                                            label="Numero de téléphone"
                                            type="tel"
                                            fullWidth
                                            inputRef={(extPhoneNumber) => this.extPhoneNumber = extPhoneNumber}
                                        />
                                    </DialogContent>
                                    <DialogActions>
                                        <Button onClick={this.handleExterneClose} color="primary">
                                            Annuler
                                        </Button>
                                        <Button
                                            color="primary"
                                            type="submit"
                                            variant="contained"
                                            className={classes.submit}>
                                            Enregistrer
                                        </Button>
                                    </DialogActions>
                                </form>
                            </Dialog>
                        </FormControl>
                        <FormControl margin="normal" fullWidth>
                            <InputLabel>Experts</InputLabel>
                            <SelectMulti
                                isMulti
                                options={projectContainer.state.expertSearchin.map((expert) => {
                                    return {
                                        value: expert.ID,
                                        label: expert.Name + " " + expert.FirstName
                                    }
                                })}
                                placeholder="Experts"
                                onInputChange={this.handleSearchExpert}
                                onChange={this.handleChangeExpert}
                            />
                        </FormControl>
                        <FormControl margin="normal" fullWidth>
                            <CreatableSelectAsync
                                isMulti
                                isClearable
                                formatCreateLabel={userInput => `Créer le mot clé  ${userInput}`}
                                placeholder="Mots clés"
                                cacheOptions
                                defaultOptions
                                onInputChange={this.handleSearchTag}
                                onChange={this.handleChangeTag}
                                options={projectContainer.state.tagSearchin.map((tag) => {
                                    return {
                                        value: tag.Word,
                                        label: tag.Word
                                    }
                                })}
                            />
                        </FormControl>
                        <FormControl margin="normal" fullWidth>
                            <CreatableSelect
                                isMulti
                                isClearable
                                formatCreateLabel={userInput => `Ajouter lien :  ${userInput}`}
                                placeholder="Liens"
                                onChange={this.handleChangeLink}
                                value={this.state.selectedLinks}
                            />
                        </FormControl>
                    </form>
                </Paper>
            </main >
        );
    }
}


// properties verifications
ProjectForm.propTypes = {
    classes: PropTypes.object.isRequired,
};

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
export default withStyles(styles)(ProjectForm);