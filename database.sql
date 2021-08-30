/*
select * from projectfile
select * from requirement
select * from customer
select * from department
select * from employee
select * from deleted_employee
select * from project */

--note for API back end. 
--after adding the deleted row in the deleted table. update the row and insert the correct deletedby with the id of the person who have deleted
--use an if statement to check whether the user is a manager of not. if the user is a manager than you need to add them to the manager table as well. 
--but if there already is a manager for that department you cannot add another manager. There is only one manager for a department. 
/*Readme
				     ---You should CREATE the tables, ALTER them CREATE the SEQUENCES BEFORE INSERTING THE values by following the same order
				  */ 

-- select * from super_users;
CREATE SEQUENCE superUser_seq
				start 1001
				increment 1;
 
 create table super_users(
 						  employeeid VARCHAR DEFAULT nextval('superUser_seq'),
	 					  workPosition VARCHAR,
	 					  
	 					  PRIMARY KEY (employeeid)
	 
 						);
						
/*================================================================================================================================*/
CREATE SEQUENCE department_seq
				start 2000
				increment 10;
               /*==========================*/

CREATE TABLE department (
 						   departmentid VARCHAR DEFAULT nextval('department_seq'),
 						   departmentname VARCHAR, 
 						   createdat  VARCHAR DEFAULT TO_CHAR(NOW(), 'dd/mm/yyyy'),
 						   createdby VARCHAR,  
						   
 						   PRIMARY KEY(departmentid),
                           
	                       FOREIGN KEY (createdby) REFERENCES super_users(employeeid)
 						);
						
/*===============================================================================================================================*/

CREATE SEQUENCE employee_sequence
				start 1000
				increment 10;

CREATE TABLE employee(
 					 employeeID  VARCHAR DEFAULT nextval('employee_sequence'), 
 					 givennames VARCHAR,
 					 lastnamee VARCHAR,
 					 dateofbirth DATE,
 					 email VARCHAR ,
 					 address TEXT,
 					 contract TEXT ,
 					 position TEXT ,
 					 password VARCHAR ,  
  					 createdby VARCHAR ,   
 					 createdat VARCHAR DEFAULT TO_CHAR(NOW(), 'dd/mm/yyyy'), 
 					 departmentid VARCHAR, 
					  
 					 PRIMARY KEY (employeeid),
					  
                     FOREIGN KEY(departmentid) REFERENCES department(departmentid),
	                 FOREIGN KEY (createdby) REFERENCES super_users(employeeid)
 					 );						
						
/*================================================================================================================================*/
CREATE SEQUENCE customer_seq
				start 100
				increment 1;
	        /*============================*/

CREATE TABLE customer(
 						customerid VARCHAR DEFAULT nextval('customer_seq'),
 						name VARCHAR,
 						email VARCHAR,
 						phone VARCHAR,
 	                    contactpersonname VARCHAR,
 						postalcode VARCHAR,
 						createdat VARCHAR DEFAULT TO_CHAR(NOW(), 'dd/mm/yyyy'),
 						createdby VARCHAR,

 						PRIMARY KEY (customerid),
	
	                    FOREIGN KEY (createdby) REFERENCES employee(employeeid)
	
 			          ); 
					  
/*===============================================================================================================================*/
CREATE TABLE deleted_employee(
	
 					 employeeid VARCHAR, 
 					 givennames VARCHAR,
 					 lastname VARCHAR,
 					 dateofbirth DATE,
 					 email VARCHAR ,
 					 address TEXT,
 					 contract TEXT ,
 					 position TEXT ,
 					 password VARCHAR ,  
  					 deletedby VARCHAR ,   
 					 deletedat VARCHAR DEFAULT TO_CHAR(NOW(), 'dd/mm/yyyy'), 
 					 departmentid VARCHAR, 
	                 
					  
 					  PRIMARY KEY (employeeid),
					 
	                  FOREIGN KEY (deletedby) REFERENCES employee(employeeid)
	
 					 );
/*================================================================================================================================*/
create function before_employee()
returns trigger as 
$$

BEGIN
   INSERT INTO deleted_employee(employeeid,
								givennames, 
								lastname, 
								dateofbirth, 
								email, 
								address, 
								contract, 
								position, 
								password, 
								deletedby, 
								departmentid) 
VALUES(
old.employeeID,
old.employeeid,
old.givennames,
old.dateofbirth,
old.email,
old.address,
old.contract,
old.position,
old.password,
old.createdby,
old.departmentid
);
   return new;
END;

$$
LANGUAGE 'plpgsql';

/*======================================================*/
CREATE TRIGGER insert_into_deleted_employee
  BEFORE DELETE
  ON EMPLOYEE
  FOR EACH ROW
  EXECUTE PROCEDURE before_employee();
/*================================================================================================================================*/

CREATE TABLE manager (
 						 employeeid  VARCHAR UNIQUE,
 						 departmentid  VARCHAR,

 						 PRIMARY KEY(employeeid, departmentid),

 						 FOREIGN KEY (employeeid) REFERENCES employee(employeeid),
 						 FOREIGN KEY (departmentid) REFERENCES department(departmentid)
 					);
					
/*================================================================================================================================*/
CREATE SEQUENCE project_seq
				start 2020
				increment 1;
               /*===========================*/	

CREATE TABLE project( 
	                    projectid VARCHAR DEFAULT nextval('project_seq'),
 		                customerid VARCHAR,
 		                name VARCHAR,
			            description VARCHAR,
 			            startdate Date,
 			            enddate DATE,
 			            Location VARCHAR DEFAULT '2002',
			            timeline int DEFAULT 0,
                        staff VARCHAR,
	                    status VARCHAR DEFAULT 'active',
	                    createdat VARCHAR DEFAULT TO_CHAR(NOW(), 'dd/mm/yyyy'),
                      	createdby VARCHAR,

 			        PRIMARY KEY(projectid),

 		            FOREIGN KEY(customerid) REFERENCES customer(customerid),
 		            FOREIGN KEY(staff) REFERENCES employee(employeeid),
	                FOREIGN KEY (createdby) REFERENCES manager(employeeid)

 			         );
/*================================================================================================================================*/
CREATE TABLE deleted_project( 
	                    projectid VARCHAR,
 						customerid VARCHAR,
 						departmentid VARCHAR,
 						name VARCHAR,
					    description VARCHAR,
 						startdate Date,
 						enddate DATE,
 						location VARCHAR ,
					    timeline int ,
	                    staff VARCHAR,
	                    status VARCHAR ,
	                    deletedat VARCHAR DEFAULT TO_CHAR(NOW(), 'dd/mm/yyyy'),
                      	deletedby VARCHAR,


 						PRIMARY KEY(projectid),

 						FOREIGN KEY(deletedby) REFERENCES employee(employeeid)
 						
 			         );
/*=================================================================================================================================*/					 

create function deleted_project()
returns trigger as 
$$

BEGIN
   INSERT INTO deleted_project(projectid,customerid,departmentid,name,description,startdate,enddate,location,timeline,staff,status,deletedby) 
   
VALUES(old.projectid,
old.customerid,
old.departmentid,
old.name,
old.description,
old.startdate,
old.enddate,
old.location,
old.timeline,
old.staff,
old.status,
old.createdby);
   return new;
END;

$$
LANGUAGE 'plpgsql';

/*======================================================*/
CREATE TRIGGER insert_into_deleteProject
  AFTER DELETE
  ON PROJECT
  FOR EACH ROW
  EXECUTE PROCEDURE deleted_project();
/*===================================================================================================================================*/
CREATE SEQUENCE projectReport_seq
				start 3000
				increment 1	;	
               /*===========================*/


CREATE TABLE project_report(
 						reportid VARCHAR DEFAULT nextval('projectReport_seq'),
 						projectid VARCHAR,
 						description TEXT,
 						createdat VARCHAR DEFAULT TO_CHAR(NOW(), 'dd/mm/yyyy'),
 						createdby VARCHAR,   

 						PRIMARY KEY(reportid),

 						FOREIGN KEY(projectid) REFERENCES project(projectid),
	                    FOREIGN KEY (createdby) REFERENCES manager(employeeid)
 );
/*=================================================================================================================================*/
CREATE SEQUENCE managerReport_seq
				start 10000
				increment 1;			
               /*===========================*/

CREATE TABLE manager_report(
 						  reportid VARCHAR DEFAULT nextval('managerReport_seq'),
 						  employeeid  VARCHAR,
 						  description  TEXT,
 						  createdat  VARCHAR DEFAULT TO_CHAR(NOW(), 'dd/mm/yyyy'),
 						  createdby VARCHAR,  /*To reference the employeeID from manager table*/

 						  PRIMARY KEY (reportid),
	
 						  FOREIGN KEY (employeeid) REFERENCES employee(employeeid),
	                      FOREIGN KEY (createdby) REFERENCES super_users(employeeid)
 			              );
/*=================================================================================================================================*/
CREATE SEQUENCE team_seq
				start 1000
				increment 10;
               /*===========================*/

CREATE TABLE team (
 				  teamid VARCHAR UNIQUE DEFAULT nextval('team_seq'),
 				  projectid VARCHAR,
				  departmentid VARCHAR,
 				  name text ,
 				  techlead VARCHAR UNIQUE,        
 				  createdat  VARCHAR DEFAULT TO_CHAR(NOW(), 'dd/mm/yyyy'),
 				  createdby VARCHAR,   
	
 	              PRIMARY KEY(teamID, techLead), 
	
 				  FOREIGN KEY(projectid) REFERENCES project(projectid),
				  FOREIGN KEY (departmentid) REFERENCES department(departmentid),
	              FOREIGN KEY (createdby) REFERENCES manager(employeeid),
	              FOREIGN KEY (techlead) REFERENCES employee(employeeid)
				  
                  );
/*=================================================================================================================================*/
CREATE SEQUENCE task_seq
				start 1000
				increment 10;
               /*============================*/


CREATE TABLE task(
 				  taskid VARCHAR UNIQUE DEFAULT nextval('task_seq'),
 				  name text ,
 	              teamid VARCHAR,
                  startdate date ,
 				  enddate date ,
	              description VARCHAR,
	              createdat  VARCHAR DEFAULT TO_CHAR(NOW(), 'dd/mm/yyyy'),
				  createdby VARCHAR,
	              status VARCHAR,
	
 				  PRIMARY KEY(taskid),
	
 	              FOREIGN KEY (teamid) REFERENCES team(teamid),
	              FOREIGN KEY (createdby) REFERENCES team(techlead)

 				 );
				 
				 
/*================================================================================================================================*/
CREATE TABLE deleted_task(
 				  taskid VARCHAR, 
	              name text ,
 	              teamid VARCHAR,
                  startdate date ,
 				  enddate date ,
	              description VARCHAR,
	              deletedat  VARCHAR DEFAULT TO_CHAR(NOW(), 'dd/mm/yyyy'),
				  deletedby VARCHAR,       
	
 				  PRIMARY KEY(taskid),
	
 	              FOREIGN KEY (deletedBy) REFERENCES employee(employeeID)

 				 );
/*================================================================================================================================*/
create function deleted_task()
returns trigger as 
$$

BEGIN
   INSERT INTO deleted_task(taskid, name, startdate, enddate, description, deletedby) 

VALUES(old.taskid,
old.name,
old.teamid,
old.startdate,
old.enddate,
old.description,
old.deletedby

);
   return new;
END;

$$
LANGUAGE 'plpgsql';

/*======================================================*/
CREATE TRIGGER insert_into_deleted_task
  AFTER DELETE
  ON TASK
  FOR EACH ROW
  EXECUTE PROCEDURE deleted_task();
/*==================================================================================================================================*/
CREATE SEQUENCE departmentReport_seq
				start 10000
				increment 10;
               /*============================*/


CREATE TABLE department_report (
 						reportid VARCHAR DEFAULT nextval('departmentReport_seq'),
 				        departmentid VARCHAR, 
 						description VARCHAR, 
 						createdat VARCHAR DEFAULT TO_CHAR(NOW(),'dd/mm/yyyy'), 
 						createdby VARCHAR,

						PRIMARY KEY(reportid, departmentid),
	
 		                FOREIGN KEY (departmentid) REFERENCES department(departmentid),
	                    FOREIGN KEY (createdby) REFERENCES manager(employeeid)
	 
 						);
/*=================================================================================================================================*/
CREATE SEQUENCE employeeReport_seq
				start 10000
				increment 10;
           	/*===========================*/

 CREATE TABLE employee_report(
	                        reportid VARCHAR DEFAULT nextval('employeeReport_seq'),
 							description TEXT,
 							createdat VARCHAR DEFAULT TO_CHAR(NOW(), 'dd/mm/yyyy'), 
 							createdby VARCHAR ,/*to reference employee(employeeID)*/
 							employeeid VARCHAR ,
							 
 							PRIMARY KEY (reportid),
							 
 							FOREIGN KEY(employeeid) REFERENCES employee(employeeid),
	                        FOREIGN KEY (createdby) REFERENCES manager(employeeID)
	
 							);
/*=================================================================================================================================*/
CREATE SEQUENCE Requirement_seq
				start 1010
				increment 1;
                /*==========================*/


CREATE TABLE     Requirement(
	                        requirementid VARCHAR DEFAULT nextval('Requirement_seq'),
 							functionalrequirement TEXT,
							nonfunctionalrequirement TEXT,
 							description VARCHAR, 
 							projectid VARCHAR ,
 					
							 
 							PRIMARY KEY (requirementid),
							 
 							FOREIGN KEY(projectid) REFERENCES project(projectid)
	
 							);
/*=================================================================================================================================*/
CREATE SEQUENCE projectFile_seq
                                start 100001
                                increment 1;
               /*===========================*/


CREATE TABLE projectfile(
	                        projectfileid VARCHAR DEFAULT nextval('projectFile_seq'),
 							feasibility TEXT,
 							environment VARCHAR, 
 							projectid VARCHAR ,
 					
							 
 							PRIMARY KEY (projectFileid),
							 
 							FOREIGN KEY(projectid) REFERENCES project(projectid)
	
 							);