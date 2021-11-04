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

            if(customers){
                this.customerList.splice(0,this.customerList.length)
                this.customerList.push(
                    ...customers
                )
            }
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
        leftList : [],
        setProjectListAll (allProject){
            this.leftList.splice(0,this.leftList.length)
            this.leftList.push(
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
        },
        reload: false,
        setReload(status){
                this.reload = status;
        },
        ITProjectFile: '',
        RIProjectFile: '',
        SMProjectFile: '',

        setSMProjectFile(description){
            if(description !== ''){
                this.SMProjectFile = '';
                this.SMProjectFile = description;
            }
            else{
                this.SMProjectFile = '';
            }
        },
        setRIProjectFile(description){
            if(description !== ''){

                this.RIProjectFile = '';
                this.RIProjectFile = description;
            }
            else{
                this.RIProjectFile = '';
            }
        },
        setITProjectFile(description){
            if(description !== ''){

                this.ITProjectFile = '';
                this.ITProjectFile = description;
            }
            else{
                this.ITProjectFile = '';
            }


        },
        loggedIn: false,
        setLoggedIn(status){
                this.loggedIn = status
        },

        selectedCustomer: {},
        setSelectedCustomer(customer){
                this.selectedCustomer = customer
        },
        selectedCustomerProjects : [],
        setSelectedCustomerProjects(projects){
            this.selectedCustomerProjects.splice(0,this.selectedCustomerProjects.length)
            this.selectedCustomerProjects.push(
                ...projects
            )
        },
        customerProjectEndDate: '',
        customerProjectStartDate: '',

        setCustomerProjectEndDate(date){
            this.customerProjectEndDate = date
        },
        setCustomerProjectStartDate(date){
            this.setCustomerProjectStartDate = date
        },
        departmentStaffList:[],
        setDepartmentStaffList(staffList){
            this.departmentStaffList.splice(0,this.departmentStaffList.length)
            this.departmentStaffList.push(
                ...staffList
            )
        },
        employeeStaffList:[],
        setEmployeeStaffList(staffList){
            this.employeeStaffList.splice(0,this.employeeStaffList.length)
            this.employeeStaffList.push(
                ...staffList
            )
        },
        selectedDepartment: {},
        setSelectedDepartment(department){
                this.selectedDepartment = department
        },

        selectedDepartmentStaffList: [],
        setSelectedDepartmentStaffList(staffList){
            this.selectedDepartmentStaffList.splice(0,this.selectedDepartmentStaffList.length)
            this.selectedDepartmentStaffList.push(
                ...staffList
            )
        }




    }
}