import React, { Component } from "react";
import Main from '../templates/Main'
import axios from 'axios'


const baseUrl = 'http://localhost:3001/users'
const initialState = {
    user: { social: '', fantasia: '', cnpj: '', celular: '', cidade: '', estado: '' },
    list: []
}

export default class UserCrud extends Component {

    state = { ...initialState }

    componentWillMount() {
        axios(baseUrl).then(resp => { this.setState({ list: resp.data }) })
    }

    clear() {
        this.setState({ user: initialState.user })
    }

    save() {
        const user = this.state.user
        const method = user.id ? 'put' : 'post'
        const url = user.id ? `${baseUrl}/${user.id}` : baseUrl
        axios[method](url, user)
            .then(resp => {
                const list = this.getUpdateList(resp.data)
                this.setState({ user: initialState.user, list })
            })
    }

    getUpdateList(user) {
        const list = this.state.list.filter(u => u.id !== user.id)
        list.unshift(user)
        return list
    }

    updateField(event) {
        const user = { ...this.state.user }
        user[event.target.name] = event.target.value
        this.setState({ user })
    }

    renderForm() {
        return (
            <div className="form">
                <div className="row">
                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>Razão Social</label>
                            <input type="text" className="form-control" name="social" value={this.state.user.social}
                                onChange={e => this.updateField(e)} />
                        </div>
                    </div>
                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>Nome Fantasia</label>
                            <input type="text" className="form-control" name="fantasia" value={this.state.user.fantasia}
                                onChange={e => this.updateField(e)} />
                        </div>
                    </div>
                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>CNPJ</label>
                            <input type="text" className="form-control" name="cnpj" value={this.state.user.cnpj}
                                onChange={e => this.updateField(e)} />
                        </div>
                    </div>
                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>Celular</label>
                            <input type="text" className="form-control" name="celular" value={this.state.user.celular}
                                onChange={e => this.updateField(e)} />
                        </div>
                    </div>
                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>Cidade</label>
                            <input type="text" className="form-control" name="cidade" value={this.state.user.cidade}
                                onChange={e => this.updateField(e)} />
                        </div>
                    </div>
                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>Estado</label>
                            <input type="text" className="form-control" name="estado" value={this.state.user.estado}
                                onChange={e => this.updateField(e)} />
                        </div>
                    </div>
                </div>
                <hr />
                <div className="row">
                    <div className="col-12 d-flex justify-content-end">
                        <button className="btn btn-primary"
                            onClick={e => this.save(e)}>
                            Salvar
                        </button>

                        <button className="btn btn-secondary ml-12"
                            onClick={e => this.clear(e)}>
                            Cancelar
                        </button>
                    </div>
                </div>
            </div>
        )
    }

    load(user) {
        this.setState({ user })
    }

    remove(user) {
        axios.delete(`${baseUrl}/${user.id}`).then(resp => {
            const list = this.state.list.filter(u => u !== user)
            this.setState({ list })
        })
    }

    renderTable() {
        return (
            <table className="table mt-4">
                <thead>
                    <tr>
                        <th>Razão Social</th>
                        <th>Nome Fantasia</th>
                        <th>CNPJ</th>
                        <th>Celular</th>
                        <th>Cidade</th>
                        <th>Estado</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {this.renderRows()}
                </tbody>
            </table>
        )
    }

    renderRows() {
        return this.state.list.map(user => {
            return (
                <tr key={user.id}>
                    <td>{user.social}</td>
                    <td>{user.nome_fantasia}</td>
                    <td>{user.cnpj}</td>
                    <td>{user.celular}</td>
                    <td>{user.cidade}</td>
                    <td>{user.estado}</td>
                    <td>
                        <button className="btn btn-warning" onClick={() => this.load(user)}>
                            <i className="fa fa-pencil"></i>
                        </button>
                        <button className="btn btn-danger ml-2" onClick={() => this.remove(user)}>
                            <i className="fa fa-trash"></i>
                        </button>
                    </td>
                </tr>
            )
        })
    }

    render() {
        return (
            <Main icon="users" title="Usuários" subtitle="Cadastro de Agricultores.">
                {this.renderForm()}
                {this.renderTable()}
            </Main>
        )
    }
}