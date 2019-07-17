export const role = {
  responsible: "Responsable",
  professor: "Professeur",
  student: "Etudiant",
  guest: "Visiteur"
}

export const state = {
  entry: "Saisie",
  validation: "Validation",
  valid: "Valide",
  contest: "Concours",
  assigned: "Attribué",
  finished: "Terminé"
}

export const nav = {
  menuState: {
    open: true,
    close: false
  },
  action: {
    none: { id: "none", icon: "" },
    menu: { id: "menu", icon: "glyphicon glyphicon-menu-hamburger" },
    back: { id: "back", icon: "glyphicon glyphicon-arrow-left" },
    exit: { id: "exit", icon: "glyphicon glyphicon-remove"},
    disconnect: { id: "disconnect", icon: "glyphicon glyphicon-log-out"},
    connect: { id: "connect", icon: "glyphicon glyphicon-log-in"},
    user: { id: "user", icon: "glyphicon glyphicon-user"}
  }
}

export const actions = {
  save: {
    text: "SideBar.Actions.Save",
    icon: "glyphicon glyphicon-ok-sign",
    roles: [],
    states: []
  },
  saveAttribution: {
    text: "SideBar.Actions.SaveAttribution",
    icon: "glyphicon glyphicon-ok-sign",
    roles: [],
    states: []
  },
  cancel: {
    text: "SideBar.Actions.Cancel",
    icon: "glyphicon glyphicon-remove-sign",
    roles: [],
    states: []
  },
  delete: {
    text: "SideBar.Actions.Delete",
    icon: "glyphicon glyphicon-trash",
    roles: [],
    states: []
  },
  versionPDF: {
    text: "SideBar.Actions.PDFVersion",
    icon: "glyphicon glyphicon-save-file",
    roles: [],
    states: []
  },

  toValidation: {
    text: "SideBar.Actions.ToValidation",
    icon: "glyphicon glyphicon-check",
    roles: [role.professor, role.responsible],
    states: [state.entry]
  },
  toValid: {
    text: "SideBar.Actions.ToValid",
    icon: "glyphicon glyphicon-ok",
    roles: [role.responsible],
    states: [state.validation]
  },
  toEntry: {
    text: "SideBar.Actions.ToEntry",
    icon: "glyphicon glyphicon-repeat",
    roles: [role.professor, role.responsible],
    states: [state.toValidation, state.toValid]
  },
  toContest: {
    text: "SideBar.Actions.ToContest",
    icon: "glyphicon glyphicon-user",
    roles: [role.responsible],
    states: [state.valid]
  },
  toFinished: {
    text: "SideBar.Actions.ToFinished",
    icon: "glyphicon glyphicon-inbox",
    roles: [role.responsible],
    states: [state.assigned]
  },

  addFavs: {
    text: "SideBar.Actions.AddToFavorites",
    icon: "glyphicon glyphicon-star",
    roles: [role.student],
    states: [state.contest]
  },
  remFavs: {
    text: "SideBar.Actions.RemoveFromFavorites",
    icon: "glyphicon glyphicon-star",
    roles: [role.student],
    states: [state.contest]
  },
  addChoices: {
    text: "SideBar.Actions.AddToChoices",
    icon: "glyphicon glyphicon-list",
    roles: [role.responsible, role.student], //---------
    states: [state.contest]
  },
  remChoices: {
    text: "SideBar.Actions.RemoveFromChoices",
    icon: "glyphicon glyphicon-trash",
    roles: [role.responsible,role.student], //---------
    states: [state.contest]
  },
  saveChoices: {
    text: "SideBar.Actions.SaveChoices",
    icon: "glyphicon glyphicon-ok-sign",
    roles: [role.responsible,role.student], //---------
    states: [state.contest]
  },
  add: {
    path: "/Ajouter",
    text: "SideBar.Actions.AddProject",
    icon: "glyphicon glyphicon-plus-sign",
    roles: [],
    states: []
  },
  attribution: {
    path: "/LancerAttribution",
    text: "SideBar.Actions.LaunchAttribution",
    icon: "glyphicon glyphicon-transfer",
    roles: [role.responsible],
    states: []
  },
  exportExcel: {
    text: "SideBar.Actions.ExportExcel",
    icon: "glyphicon glyphicon-th",
    roles: [],
    states: []
  },
  exportPDF: {
    text: "SideBar.Actions.ExportPDF",
    icon: "glyphicon glyphicon-save-file",
    roles: [],
    states: []
  }
}

export const subPages = {
  view: {
    path: "/Details",
    text: "SideBar.SubPages.View",
    roles: [role.guest, role.student, role.professor, role.responsible],
    actions: [actions.versionPDF]
  },
  add: {
    path: "/Ajouter",
    text: "SideBar.SubPages.Add",
    roles: [role.professor, role.responsible],
    actions: [actions.save, actions.cancel]
  },
  update: {
    path: "/Modifier",
    text: "SideBar.SubPages.Update",
    roles: [role.professor, role.responsible],
    actions: [actions.save, actions.cancel, actions.delete]
  },
  attribution: {
    path: "/LancerAttribution",
    text: "SideBar.SubPages.Attribution",
    roles: [role.responsible],
    actions: [actions.saveAttribution, actions.cancel]
  }
}

export const filters = {
  periods: { text: "SideBar.Filters.Periods" },
  channels: { text: "SideBar.Filters.Channels" },
  Types: { text: "SideBar.Filters.Types" },
  Languages: { text: "SideBar.Filters.Languages" },
  State: { text: "SideBar.Filters.State" }
}
export const attributionPage = {
  Project: { text: "Projet" },
  Resp: { text: "Responsable" },
  Student: { text: "Etudiant attribué" },
  Choice: { text: "choix n°" }
}
export const pages = {
  finished: {
    path: "/ProjetsTermines",
    text: "MainMenu.Finished",
    roles: [role.guest, role.student, role.professor, role.responsible],
    displays: [
      {
        path: "/",
        text: "",
        actions: [],
        batchActions: [],
        filters: [
          filters.periods,
          filters.channels,
          filters.Types,
          filters.Languages
        ]
      }
    ]
  },
  myProjects: {
    path: "/MesProjets",
    text: "MainMenu.MyProjects",
    roles: [role.professor, role.responsible],
    displays: [
      {
        path: "/Saisie",
        text: "SideBar.Display.MyProjects-entry",
        actions: [actions.add,actions.toValidation, actions.delete],
        batchActions: [],
        filters: [
          filters.periods,
          filters.channels,
          filters.Types,
          filters.Languages
        ]
      },
      {
        path: "/Tout",
        text: "SideBar.Display.MyProjects-all",
        actions: [actions.add, actions.toEntry],
        batchActions: [],
        filters: [
          filters.periods,
          filters.channels,
          filters.Languages,
          filters.State
        ]
      }
    ]
  },
  contest: {
    path: "/Concours",
    text: "MainMenu.Contest",
    roles: [role.student],
    displays: [
      {
        path: "/Tout",
        text: "SideBar.Display.Contest-contest",
        actions: [actions.addChoices, actions.add],
        batchActions: [],
        filters: [
          filters.periods,
          filters.channels,
          filters.Types,
          filters.Languages
        ]
      },
      {
        path: "/Favoris",
        text: "SideBar.Display.Contest-favorites",
        actions: [],
        batchActions: [],
        filters: []
      },
      {
        path: "/Choix",
        text: "SideBar.Display.Contest-choices",
        actions: [actions.remChoices, actions.saveChoices],
        batchActions: [],
        filters: []
      }
    ]
  },
  administration: {
    path: "/Administration",
    text: "MainMenu.Administration",
    roles: [role.responsible],
    displays: [
      {
        path: "/Validation",
        text: "SideBar.Display.Admin-validation",
        actions: [actions.toValid, actions.toEntry],
        batchActions: [],
        filters: [
          filters.periods,
          filters.channels,
          filters.Types,
          filters.Languages
        ]
      },
      {
        path: "/Valide",
        text: "SideBar.Display.Admin-valid",
        actions: [actions.toContest, actions.toEntry],
        batchActions: [],
        filters: [
          filters.periods,
          filters.channels,
          filters.Types,
          filters.Languages
        ]
      },
      {
        path: "/Concours",
        text: "SideBar.Display.Admin-contest",
        actions: [actions.toEntry],
        batchActions: [],
        filters: [
          filters.periods,
          filters.channels,
          filters.Types,
          filters.Languages
        ]
      },
      {
        path: "/Attribue",
        text: "SideBar.Display.Admin-assigned",
        actions: [actions.toFinished, actions.toEntry],
        batchActions: [],
        filters: [
          filters.periods,
          filters.channels,
          filters.Types,
          filters.Languages
        ]
      },
      {
        path: "/Termine",
        text: "SideBar.Display.Admin-finished",
        actions: [actions.toEntry],
        batchActions: [],
        filters: [
          filters.periods,
          filters.channels,
          filters.Types,
          filters.Languages
        ]
      }
    ]
  },
  attribution: {
    path: "/Attribution",
    text: "MainMenu.Attribution",
    roles: [role.responsible],
    displays: [
      {
        path: "/Projets",
        text: "SideBar.Display.Attribution-projects",
        actions: [],
        batchActions: [actions.attribution],
        filters: [
          filters.periods,
          filters.channels,
          filters.Types,
          filters.Languages
        ]
      },
      {
        path: "/Etudiants",
        text: "SideBar.Display.Attribution-students",
        actions: [],
        batchActions: [actions.attribution],
        filters: [
          filters.periods,
          filters.channels,
          filters.Types,
          filters.Languages
        ]
      },
      {
        path: "/LaunchAttribution",
        text: "SideBar.Display.Attribution-launching",
        actions: [actions.attribution],
        batchActions: [],
        filters: [
          filters.periods,
          filters.channels,
          filters.Types,
          filters.Languages
        ]
      }
    ]
  },
  export: {
    path: "/Exporter",
    text: "MainMenu.Export",
    roles: [role.responsible],
    displays: [
      {
        path: "/Projets",
        text: "SideBar.Display.Export-projects",
        actions: [],
        batchActions: [actions.exportExcel, actions.exportPDF],
        filters: [
          filters.periods,
          filters.channels,
          filters.Types,
          filters.Languages,
          filters.State
        ]
      },
      {
        path: "/Experts",
        text: "SideBar.Display.Export-experts",
        actions: [],
        batchActions: [actions.exportExcel, actions.exportPDF],
        filters: [
          filters.periods,
          filters.channels,
          filters.Types,
          filters.Languages,
          filters.State
        ]
      }
    ]
  }
}

export const projects = [
  { id: "1", name: "Project no 1" },
  { id: "2", name: "Project no 2" },
  { id: "3", name: "Project no 3" },
  { id: "4", name: "Project no 4" },
  { id: "5", name: "Project no 5" },
  { id: "6", name: "Project no 6" },
  { id: "7", name: "Project no 7" },
  { id: "8", name: "Project no 8" },
  { id: "9", name: "Project no 9" },
  { id: "10", name: "Project no 10" },
  { id: "11", name: "Project no 11" },
  { id: "12", name: "Project no 12" },
  { id: "13", name: "Project no 13" },
  { id: "14", name: "Project no 14" },
  { id: "15", name: "Project no 15" }
]
