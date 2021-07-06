import React, { Component } from "react";
import MyForm from "./MyForm";
import CustomerList from "./CustomerList";
import "./app.css";
import Loader from "./Loader";
import axios from "axios";

class App extends Component {

      state = {
            customers: [],
            loader: false,
            customer: {},
            url: "http://localhost:3001/api/customers/"
      };

      getCustomers = async () => {
            this.setState({ loader: true });
            const customers = await axios.get(this.state.url);
            this.setState({ customers: customers.data, loader: false });
      }

      createCustomer = async data => {
            this.setState({ loader: true });
            await axios.post(this.state.url, {
                  first_name: data.first_name,
                  last_name: data.last_name,
                  email: data.email,
            });

            this.getCustomers();

      };

      deleteCustomer = async id => {
            this.setState({loader: true});
            await axios.delete(`${this.state.url}${id}`);

            this.getCustomers();
      };

      editCustomer = async data => {
            //clear customer obj
            this.setState({ customer: {}, loader: true });
            await axios.put(`${this.state.url}${data.id}`, {
                  first_name: data.first_name,
                  last_name: data.last_name,
                  email: data.email,
            });

            this.getCustomers();
      };

      componentDidMount(){
            this.getCustomers();
      }

      onDelete = id => {
            // console.log("app", id);
            this.deleteCustomer(id);

      };

      onEdit = data => {
         this.setState({ customer: data });
            
      };

      onFormSubmit = data => {
            //console.log('app', data);
               //console.log("app: ", data);
               this.setState({ customer: data });
               if (data.isEdit) {
                     this.editCustomer(data);
               }
               else {
                     this.createCustomer(data);
               }
      }

      render(){
        return (
          <div>
            <div className="ui fixed inverted menu">
              <div className="ui container">
                <a href="/#" className="header item">
                  CRUD React com Node Api
                </a>
              </div>

            </div>

            <div className="ui main container">
              <MyForm customer={this.state.customer} 
                onFormSubmit={this.onFormSubmit}
              />

              { this.state.loader ? <Loader /> : ""}
                <CustomerList
                  customers={this.state.customers} 
                  onDelete={this.onDelete} 
                  onEdit={this.onEdit} 
                />
            </div>
          </div>
        );
      }
}

export default App;