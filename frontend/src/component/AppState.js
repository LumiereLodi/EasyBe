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
        }
    }
}