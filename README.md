# Project Setup
  1. First clone the repository - git clone https://github.com/Umadutth/customer-management
  2. Navigate into the project directory - cd customer-management
  3. Install all dependencies files - npm install
  4. Run project - ng serve
# Application Structure 
  1. List Customers (Default page) - Created an application for customer management. The default page shows the list of customers with some basic details like Name, Username, Phone, Email, City, Company, and Action. The action column                                               contains the customer details/edit and delete buttons. The pagination is set based on the customer's count. We can also select the number of customers need to list per page by default we set the per page                                        count as 5.
  2. Search Customer - We can search by entering the keyword in the search section given in the header section of the table. The search response will only be based on the value of customer details like Name, Username, Email, City, and                                Company. 
  3. Add Customer - New customers can add by clicking on the Add New Customer button, it routes to a new page, and the fields that are mandatory for the customer adding are mentioned, and only able to submit the values if the form is valid.
  4. View/Edit Customer - The customer details can be viewed by clicking on the button Details/Edit in the action column. Both the view and edit are on the same page.Initially, all the fields are in read-only format, if the customer details                             need to be edited, the edit button is in the header section of the table and then we can edit the details and update the customer details.
  5. Delete Customer - The customer data can be deleted using the delete button in the action column.  The customer is deleted only after we confirm otherwise customer is not deleted.
 
     




