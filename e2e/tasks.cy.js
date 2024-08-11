/// <reference types="cypress" />


describe ('tasks', ()=>{ //In tasks tests

    let testData; //Instance 'testData' to use for cases

    before(()=> { //Use data from fixtures/tasks.json to tests
        cy.fixture('tasks').then(t => {
            testData = t
        })
    })

    context('Create task', ()=> {
        it('should register a new task', ()=> {

            const taskName = 'Creating automation test E2E using Cypress'
    
            //Given the task is not created
            cy.deleteTaskByName(taskName)
    
            //When create an task
            cy.createTask(taskName)
    
            //Then should be visible in the created tasks
            cy.contains('main div p', taskName)
                .should('be.visible')
        })
    
        it('should not allow duplicate task', ()=> {
    
            const task = testData.dup
    
            cy.deleteTaskByName(task.name)
    
            //Given the task already is created
            cy.postTask(task)
    
            //When create the same task
            cy.createTask(task.name)
    
            //Then should be showed an alert with text "Task already exists!"
            cy.get('.swal2-html-container')
                .should('be.visible')
                .should('have.text', 'Task already exists!')
    
        }) 
    
        it('madatory fill in new task', ()=> {
            //Given go to page
            //When click to create without fill in Create new task
            cy.createTask()
            //Then should be showed the message 'This is a required field'
            cy.isRequired('This is a required field')
        })
    })

    context('Edit task', ()=> {

        it('done Task', ()=> {

            //Given a new task created
            const task = {
                name: 'Study cypress',
                is_done: false
            }

            cy.deleteTaskByName(task.name)
            cy.postTask(task)

            
            cy.visit('/')
            //When click in done task
            cy.contains('p', task.name)
                .parent()
                .find('button[class*=ItemToggle]')
                .click()

            //Then should be showed a task with line-through
            cy.contains('p', task.name)
                .should('have.css', 'text-decoration-line', 'line-through')
        })

    })

    context('Delete task', ()=> {

        it('delete Task', ()=> {

            //Given a new task created
            const task = {
                name: 'To be a new QA for your company',
                is_done: false
            }

            cy.deleteTaskByName(task.name)
            cy.postTask(task)

            
            cy.visit('/')
            //When click in delete task
            cy.contains('p', task.name)
                .parent()
                .find('button[class*=ItemDelete]')
                .click()

            //Then the task should be not showed
            cy.contains('p', task.name)
                .should('not.exist')
        })

    })
})