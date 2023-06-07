import { useState, useEffect } from "react";
import { controleBD } from '../controleSupabase';
import { useLocation, useNavigate } from "react-router-dom";

import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";
import { createClient } from '@supabase/supabase-js';

import { templateFuncionario } from "./templates";

import { Container, Form, Button, Row, Col, Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { v4 as uuidv4 } from 'uuid';
import moment from "moment";
import { upload } from "@testing-library/user-event/dist/upload";
const CDNURL =process.env.REACT_APP_SUPABASE_SERVER + "/storage/v1/object/public/imagens/" ;

function FotoUsuario({c}) {

    let navigate = useNavigate();
    //const [email, setEmail] = useState("");
    const user = useUser();
    const supabase = useSupabaseClient();
    //imagens
    const [images, setImages] = useState([]);


    let { state } = useLocation();
    /*
        let navigate = useNavigate();
       
        const [infoUsuario, setInfoUsuario] = useState(templateFuncionario);
        const [infoExtra, setInfoExtra] = useState({});
        let infoOriginal = {};*/


    //Pegar imagens
    async function getImages() {
        const { data, error } = await controleBD
            .storage
            .from('imagens')
            .list(c?.id + "/", {
                limit: 100,
                offset: 0,
                sortBy: { column: "name", order: "asc" }
            });
        if (data !== null) {
            setImages(data);
        } else {
            alert('Erro ao carregar imagens');
            console.log(error);
        }

    }
    useEffect(() => {
        if(c.id ){
            getImages();
        }
    },[c.id ]);
    //Imagens apenas do usuario
    async function uploadImage(e) {
        let file = e.target.files[0];

        const { data, error } = await controleBD
            .storage.from('imagens')
            .upload(c.id + "/" + uuidv4(), file)//id do usuario / id aleatorio
        if (data) {
            getImages();
        } else {
            console.log(error);
        }
    }

    async function deleteImage(imagename){
        const { error } = await controleBD
        .storage.from('imagens')
        .remove([c.id + "/" + imagename])
        if(error){
            alert(error);
        }else{
            getImages();
        }
    }
    /////////////////////////////////////

    return (
      
        <Container align="center" className="container-sm mt-4">
        { }
        {c.id === null ?
            <>
                <h1>É preciso fazer login</h1>
                <div><a href="/criarconta">Pagina cadasto</a></div>
            </>
            :
            <>
                {images.length == 0 ?
                    <>
                        <h3>Insira sua foto abaixo</h3>
                        <Form.Group className="mb-3" style={{ maxWidth: "500px" }}>
                            <Form.Control type="file" accept="image/png, images/jpeg, images/jpg" onChange={(e) => uploadImage(e)}></Form.Control>
                        </Form.Group>
                    </>
                    :
                    <>
                        { }
                        <div justifyContent="center">
                        <Row >
                            {
                                images.map((image) => {
                                    return (
                                        <Col xs={1} md={3} key={CDNURL + c.id + "/" + image.name}>
                                            <Card >
                                                <Card.Img variant="top" src={CDNURL + c.id + "/" + image.name} />
                                                <Card.Body>
                                                    <Button variant="danger" onClick={() => deleteImage(image.name)}>Delete Image</Button>
                                                </Card.Body>
                                            </Card>
                                        </Col>
                                    );
                                }
                                )
                                
                            }
                        </Row>
                        </div>
                    </>

                }
            </>}
    </Container>
    );
}

export default FotoUsuario;