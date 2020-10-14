import React, {Component, Fragment} from 'react';
import axios from 'axios';
import Modal from 'react-bootstrap/Modal';


export default class EditTaco extends Component{

    state = {
        taco: {},
        name: '',
        quantity: 0,
        pica: 'si',
        //nameField: this.nameFieldStart()
        showModal: false
    }

    catchName = event => this.setState({name: event.target.value});
    catchQuantity = event => this.setState({quantity: event.target.value});
    catchSpacyness = event => this.setState({pica: event.target.value});

    componentDidMount(){
        const tacoId = this.props.history.location.state.tacoId;
        axios.get(`http://localhost:5000/${tacoId}`)
        .then(reponse => reponse.data)
        .then(taco => {
            this.setState({taco: taco})
            console.log(this.state.taco)
        });
    }

    saveChanges = () => {
        this.handleClose();
        const {taco, name, quantity, pica} = this.state;
        axios.put(`http://localhost:5000/${taco.id}`, {
            name: name,
            quantity: quantity,
            pica: pica
        });
        this.props.history.push('/');
    }

    handleClose = () => {
        this.setState({showModal: false});
        console.log(this.state.showModal);
    }
    
    handleShow = () => {
        this.setState({showModal: true});
        console.log(this.state.showModal);
    }

    /*nameFieldStart = ()=>{
        return <div className="input-group mb-3">
                <div className="input-group-prepend">
                    <span className="input-group-text" id="inputGroup-sizing-default">Nombre</span>
                </div>
                <input onClick={this.editName} onChange={this.catchName} className='form-control' 
                type="text" name="" id="taco-name" placeholder='eje: tu taco'
                aria-label="Default" aria-describedby="inputGroup-sizing-default" value={this.state.name}/>
            </div>; 
    } 
    
    nameFieldEdit = ()=> <div className="input-group mb-3">
                        <div className="input-group-prepend">
                            <span className="input-group-text" id="inputGroup-sizing-default">Nombre</span>
                        </div>
                        <input onClick={this.editName} onChange={this.catchName} className='form-control' 
                        type="text" name="" id="taco-name" placeholder='eje: tu taco'
                        aria-label="Default" aria-describedby="inputGroup-sizing-default"/>
                    </div>; 
    editName = ()=>{
        this.setState({nameField: this.nameFieldEdit});
        console.log('click');
    }*/

    render() {
        const {name, quantity, pica, showModal} = this.state.taco;
        return (
             <Fragment>
                <h3>Editar taco:</h3>
                    <br/>
                    <div className='form-group' style={{width: '50%'}}>
                    <label>{`valor actual: ${name}`}</label>
                        <div className="input-group mb-3">
                            <div className="input-group-prepend">
                                <span className="input-group-text" id="inputGroup-sizing-default">Nombre</span>
                            </div>
                            <input onClick={this.editName} onChange={this.catchName} className='form-control' 
                            type="text" name="" id="taco-name" placeholder='eje: tu taco'
                            aria-label="Default" aria-describedby="inputGroup-sizing-default"/>
                        </div>

                        <label>{`valor actual: ${quantity}`}</label>
                        <div className="input-group mb-3">
                            
                            <div className="input-group-prepend">
                                <span className="input-group-text" id="inputGroup-sizing-default">Cantidad</span>
                            </div>
                            <input onChange={this.catchQuantity} className='form-control' 
                            type="number" name="" id="taco-quantity" placeholder='eje: tu taco'
                            aria-label="Default" aria-describedby="inputGroup-sizing-default" />
                        </div>
                        <label>{`Valor actual: ${pica}`}</label><br>
                        </br>
                        <span>¿Es picante? (Si/No):</span>
                        <div>
                            <label htmlFor="option-spyciness"></label>
                            <select className='custom-select custom-select-lg mb-3' onChange={this.catchSpacyness} id="option-spyciness" name="option-spyciness" style={{width: '20%'}}>
                                <option value="si">Si</option>
                                <option value="no">No</option>
                            </select>
                        </div>
                        
                        <div>
                            <button onClick={this.handleShow} className='btn btn-secondary' id="btn-post-taco">Guardar</button>
                            &nbsp; <button onClick={this.handleShow} className='btn btn-secondary' id="btn-post-taco">Eliminar</button>

                        </div>
                        
                    </div>
                    <Modal show={this.state.showModal} onHide={this.handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>Confirmar cambios</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <h4>Valores nuevos: </h4>
                            <p>¿Estas Seguro que quieres guardar estos cambios?</p>
                            <h5>Nombre Taco:</h5>
                            <div>{this.state.name}</div>
                            <h5>Cantidad Taco:</h5>
                            <div>{this.state.quantity}</div>
                            <h5>Es picante:</h5>
                            <div>{this.state.pica}</div>

                            <hr></hr>

                            <h4>Valores anteriores: </h4>
                            <div><h5>Nombre Taco: </h5>
                            {name}</div>
                            <h5>Cantidad Taco:</h5>
                            <div>{quantity}</div>
                            <h5>Es picante:</h5>
                            <div>{pica}</div>
                        </Modal.Body>
                        <Modal.Footer>
                            <button variant="secondary" onClick={this.handleClose}>Cancelar</button>
                            <button variant="primary" onClick={this.saveChanges}>Confirmar</button>
                        </Modal.Footer>
                    </Modal>
            </Fragment>
        );
    }
}