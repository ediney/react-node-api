import React, { Component } from 'react';
import swal from 'sweetalert';

class MyForm extends Component {
      state = {
            form: {first_name: "", last_name: "", email: "", isEdit: false},
            btnName: "Salvar",
            btnClass: "ui primary button submit-button"

      };

      isEmpty(obj) {
            return Object.entries(obj).length === 0 && obj.constructor === Object;
      }


      componentDidUpdate(prevProps) {
            if (prevProps !== this.props && !this.isEmpty(this.props.customer)) {
                  //console.log("update");
                  this.setState({
                        form: {...this.props.customer, isEdit: true},
                        btnName: "Atualizar",
                        btnClass: "ui orange button submit-button"

                  });
            }
      }

      handleChange = event => {
            const {name, value} = event.target;
            let form = this.state.form;
            form[name] = value;
            this.setState({ form });
      }


      onFormSubmit = event => {
      //prevent form submit
      event.preventDefault();

      //form formValidation
            if(this.formValidation()){
                  // send data ato app
                  this.props.onFormSubmit(this.state.form);
                  
            }

      this.clearFormFields();
      };

      formValidation = () => {
            //first name 
            if (document.getElementsByName("first_name")[0].value === '' ) {
                  swal("Atenção!", "Preencha seu nome!", "warning");
                  return false;
            }

            if (document.getElementsByName("last_name")[0].value === '' ) {
                  swal("Atenção!", "Preencha seu sobrenome!", "warning");
                  return false;
            }

            if (document.getElementsByName("first_name")[0].value === '' ) {
                  swal("Atenção!", "Preencha seu e-mail!", "warning");
                  return false;
            }

            return true;
      }

      clearFormFields = () => {
            // Limpar campos 
            this.setState({
                  form: {first_name: "", last_name: "", email: "", isEdit: false}
            });

            this.setState({
                  btnName: "Salvar",
                  btnClass: "ui primary button submit-button"
            });

            document.querySelector(".form").reset();
            console.log("limpou form");
      };

      render(){
            return (
                 <form className="ui form">
                       <div className="fields">
                             <div className="four wide field">
                                   <label> Nome </label>
                                   <input type="text" name="first_name" 
                                   placeholder="Digite seu nome" 
                                   onChange={this.handleChange}
                                   value={this.state.form.first_name}
                                    />
                             </div>

                             <div className="four wide field">
                                   <label> Sobrenome </label>
                                   <input type="text" name="last_name" 
                                   placeholder="Digite seu sobrenome"
                                   onChange={this.handleChange}
                                   value={this.state.form.last_name}
                                    />
                             </div>

                             <div className="four wide field">
                                   <label> E-mail </label>
                                   <input type="text" name="email" 
                                   placeholder="Digite seu e-mail"
                                   onChange={this.handleChange}
                                   value={this.state.form.email}
                                    />
                             </div>

                             <div className="four wide field">
                                   <button className={this.state.btnClass}
                                          onClick={this.onFormSubmit}
                                   >
                                    { this.state.btnName} 
                                    </button>
                             </div>
                       </div>
                 </form> 
            );
      }
}

export default MyForm;