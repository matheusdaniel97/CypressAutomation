Cypress.Commands.add('createTask', (taskName = '')=> { //Create task command
    
    cy.visit('/') //Visit link

    cy.get('#newTask').as('inputTask') //Id = 'New task' get nickname 'inputTask'

    if(taskName !== '') { //If taskName is different nothing
        cy.get('@inputTask') 
        .type(taskName) //In nickname 'inputTask' input taskName
    }

    cy.contains('button', 'Create').click() //Get button where text is create and click
})

Cypress.Commands.add('deleteTaskByName', (taskName)=> { //Request by API Delete method task by name
    cy.request({
        url: Cypress.env('apiUrl') + '/helper/tasks', 
        method: 'DELETE',
        body: {name: taskName}
    }).then(response => {
        expect(response.status).to.eq(204) //Assert that response is equal 204
    })
})

Cypress.Commands.add('postTask', (task)=> { //Request by API Post metthod to add task
    cy.request({
        url: Cypress.env('apiUrl') + '/tasks',
        method: 'POST',
        body: task
    }).then(response => {
        expect(response.status).to.eq(201) //Assert that response is equal 201
    })
})

Cypress.Commands.add('isRequired', (targetMessage)=> {
    cy.get('@inputTask')
        .invoke('prop', 'validationMessage') //That's used to get recourses from own browsers
        .should((text) => {
            expect(
                targetMessage //Assert that the text in targetMessage when call this commands is equal to text that has got from browser
            ).to.eq(text)
        })
})