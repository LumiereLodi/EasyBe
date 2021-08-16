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
        }
    }
}