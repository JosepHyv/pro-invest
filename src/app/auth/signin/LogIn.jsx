'use client';

import React from "react";
import {useState, useEffect} from 'react';
import { Label, TextInput, Button, Modal } from "keep-react";
import {Envelope, EyeSlash, Lock,WarningCircle } from 'phosphor-react';


const LogIn = () => {
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");
    const [errorMessage, setErrorMsg] = useState("");
    const [error, setError] = useState(false);
    // const [validate, setValidate] = useState(false);

    const validate = () => {
        let fail = false;
        const reg = new RegExp(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/);
        console.log(reg.test(email), email)
        if(!reg.test(email))
        {
            fail = true;
            setErrorMsg('El correo no es valido');
        }
        if(!email.length || !pass.length)
        {
            fail = true;
            setErrorMsg("Todos los campos son necesarios");
        }

        setError(fail);
    }

    return (
        <div 
            className="md:w-1/3   flex flex-col align-middle p-10 md:rounded-lg md:border-opacity-35 md:border md:border-black md:shadow-lg  gap-10"
        >
            <div>
                <h1 className="text-center text-5xl font-bold text-blue-500">ProInvest </h1>
                <h1 className="text-center text-2xl font-semibold text-blue-500">Iniciar Sesion</h1>

            </div>
            <div className="gap-8">
                <Label htmlFor="#id-1" value="Correo"/>
                <TextInput
                    id="#id-1"
                    type="email"
                    placeholder="example@gmail.com"
                    color="gray"
                    value={email}
                    handleOnChange={(event) => {
                        setEmail(event.target.value);
                      }}
                    sizing="md"
                    addon={<Envelope size={20} color="#5E718D" />}
                    addonPosition="left"
                    required
                />
            </div>
            <div className="gap-10">
                <Label htmlFor="#id-2" value="Contraseña" />
                <TextInput
                    id="#id-2"
                    color="gray"
                    sizing="md"
                    type="password"
                    value={pass}
                    handleOnChange={(event) => {
                        setPass(event.target.value);
                      }}
                    addon={<Lock size={20} color="#5E718D" />}
                    addonPosition="left"
                    // icon={<EyeSlash size={20} color="#5E718D" />}
                    iconPosition="right"
                    required
                />  
            </div>
            <div className="flex flex-col justify-center items-center gap-2 ">
                <Button type="primary" onClick={() => {validate()}}> Iniciar Sesion</Button>
                <Button type={"outline-primary"}> Crear cuenta </Button>
            </div>
            <Modal
                icon={<WarningCircle size={28} color="#E92215" />}
                size="md"
                show={error}
                onClose={() => setError(!error)}
            >
                <Modal.Header>{errorMessage}</Modal.Header>
                <Modal.Footer>
                <Button type="outlineGray" onClick={() => setError(!error)}>
                    Continuar
                </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}


export default React.memo(LogIn);