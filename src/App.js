import React, { Component } from 'react'
import axios from 'axios';


class App extends Component {

  state = {
    data: [],
    showList: true,
    showIndividual: false,
    showForm: false,
  }

  handleUpload = async (id) => {
    let url = 'http://localhost:8000/users/' + id + '/'
    let form_data = new FormData();
    form_data.append('name', this.state.data.name)
    form_data.append('last_name', this.state.data.last_name)
    let data = await axios.put(url, form_data).then(({ data }) => data);
    this.getUsers();
  }

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value,
    });
  };

  handleForm = () => {
    this.setState({showForm: true, showIndividual: false});
  }

  handleEliminar = async (id) => {
    let url = 'http://localhost:8000/users/' + id + '/'
    let data = await axios.delete(url).then(({ data }) => data);
    this.getUsers();
  }

  handleUser = async (id) => {
    let url = 'http://localhost:8000/users/' + id + '/'
    let data = await axios.get(url).then(({ data }) => data);

    this.setState({data:data, showList:false, showIndividual:true})

  }

  getUsers = async () => {
    let data = await axios.get('http://localhost:8000/users/')
    .then(({ data }) => data);
    this.setState({data: data.results, showList:true, showIndividual:false})
  }

  constructor() {
    super();
    this.getUsers();
  };
  render() {
  return (
    <>
    <nav className="navbar navbar-dark bg-dark">
                <div className="container">
                    <h1 className="navbar-brand">Employess</h1>
                </div>
            </nav>
      {this.state.showList ? 
          <div className="container">
            <div class="list-group p-5">
            {this.state.data.map(d => <button type="button" onClick={() => this.handleUser(d.id)} className="list-group-item list-group-item-action">{d.name} {d.last_name}</button>)}
            </div>
          </div>
      : null}
      {this.state.showIndividual ? 
        <div className="container">
          <div className="p-5">
          <div class="card">
            <div class="card-body">
            <p>
                id: {this.state.data.id}
              </p>
              <p>
                Nombre: {this.state.data.name}
              </p>
              <p>
                Apellidos: {this.state.data.last_name}
               </p>
               <p>
                Fecha creado: {this.state.data.created.slice(0,10)}
               </p>
          </div>
          </div>
          <button onClick={() => this.getUsers()} type="button" className="btn btn-dark m-2">Regresar</button>
          <button onClick={() => this.handleForm()} type="button" className="btn btn-dark m-2">Modificar</button>
          <button onClick={() => this.handleEliminar(this.state.data.id)} type="button" className="btn btn-dark m-2">Eliminar</button>
          </div>
        </div>
      : null}
      {this.state.showForm ? 
      <div className="container">
        <div className="p-6">
          <form onSubmit={this.handleUpload(this.state.data.id)}>
        <div className="mb-3">
              <input
                type="text"
                placeholder="Nombre"
                id="name"
                value={this.state.data.name}
                onChange={this.handleChange}
                className="form-control"
                required
              />
            </div>
            <div className="mb-3">
              <input
                type="text"
                placeholder="Apellido"
                id="name"
                value={this.state.data.last_name}
                onChange={this.handleChange}
                className="form-control"
                required
              />
            </div>
            <button type="submit" className="btn btn-dark">Enviar</button>
        </form>
        </div>
      </div>
      :null}
    </>
  );
}
}

export default App;
