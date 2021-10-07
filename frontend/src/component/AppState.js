export function createAppStore(){
    return{
            departmentList:[],
            addDepartmentName(department){
                this.departmentList.splice(0,this.departmentList.length)
                this.departmentList.push(
                    ...department
                )
            },
        isAuthenticated: false,
        setAuth(connection){
            this.isAuthenticated =  connection
        },

        userInfo: {},
        setUserInfo(user){
            this.userInfo = user
        },
        projectOverview: [],
        setPorjectOverview(project){
            this.projectOverview.splice(0,this.projectOverview.length)
            this.projectOverview.push(
                ...project
            )
        },
        completedProject : '',
        setCompletedProject(project){
            this.completedProject = project
        },
        activeProject: '',
        setActiveProject(project){
                this.activeProject = project
        },

        backlogProject: '',
        setBacklogProject(project){
                this.backlogProject = project
        },

        customerList: [],
        setCustomerList(customers){
            this.customerList.splice(0,this.customerList.length)
            this.customerList.push(
                ...customers
            )

        },
        staffList: [],
        setStaffList(staff){
            this.staffList.splice(0,this.staffList.length)
            this.staffList.push(
                ...staff
            )
        },
        showListLayout: false,
        setShowListLayout (isMobile){
            this.showListLayout = isMobile
        },
        projectList : [],
        setProjectListAll (allProject){
            this.projectList.splice(0,this.projectList.length)
            this.projectList.push(
                ...allProject
            )
        },
        selectedProject : {},
        setSelectedProject (project){
            this.selectedProject = project
        },
        startDate: '',
        setStartDate(date){
                this.startDate = date
        },
        endDate : '',
        setEndDate(date){
            this.endDate = date
        },
        completedTask : '',
        setCompletedTask (number){
                this.completedTask = number
        },
        activeTask : '',
        setActiveTask (number){
            this.activeTask = number
        },
        enableSendButton: false,
        setEnableSendButton(enable){
                this.enableSendButton = enable
        },
        enableCompletedButton: false,
        setEnableCompletedButton(enable){
                this.enableCompletedButton = enable
        },
        taskList: [],
        setTaskList(tasks){
            this.taskList.splice(0,this.taskList.length)
            this.taskList.push(
                ...tasks
            )
        }

    }
}