import React from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { registerUser } from '../../redux/actions/authActions'
import {Link, Redirect} from 'react-router-dom';
import { Container, Row, Form, Button } from 'react-bootstrap';
import { GiBasketballBall} from 'react-icons/gi';

class Register extends React.Component {

    constructor() {
        super();
        this.state = {
            email: "",
            username: "",
            password: "",
            confirmPass: "",
            redirect: null,
            errors: {}
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({errors: nextProps.errors});
        }
    }

    handleChange(event) {
        const {name, value} = event.target;
        this.setState({
            [name]: value
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        const newUser = {
            email: this.state.email,
            name: this.state.username,
            password: this.state.password,
            confirmPass: this.state.confirmPass
        }

        this.props.registerUser(newUser);
            
    }

    render() {
        if (this.state.redirect) {
            return (<Redirect to={this.state.redirect} />);
        }
        return (
            <Container>
                <div className="authForm">
                    <Row className="justify-content-center my-4">
                        <h1 className="d-block-inline">CourtVision <GiBasketballBall size={48} className="d-block-inline align-top" /></h1>
                    </Row>
                    <Form onSubmit={this.handleSubmit}>
                        <Form.Group controlId="formGroupEmail">
                            <Form.Control 
                                type="email" 
                                placeholder="Email"
                                name="email"
                                value={this.state.email}
                                onChange={this.handleChange} 
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="formGroupUsername">
                            <Form.Control 
                                type="text"
                                placeholder="Username"
                                name="username"
                                value={this.state.username}
                                onChange={this.handleChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="formGroupPassword">
                            <Form.Control 
                                type="password" 
                                placeholder="Password"
                                name="password"
                                value={this.state.password}
                                onChange={this.handleChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="formGroupConfirmPassword">
                            <Form.Control 
                                type="password" 
                                placeholder="Confirm Password"
                                name="confirmPass"
                                value={this.state.confirmPass}
                                onChange={this.handleChange}
                                required
                            />
                        </Form.Group>
                        <Button variant="primary" type="submit">Register</Button>
                    </Form>
                    <p className="mx-4 my-3">Already have an account? <Link to="/login">Log in Here</Link></p>
                </div>
            </Container>
        );
    }
}

Register.propTypes = {
    registerUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    auth: state.authorization,
    errors: state.errors
})

export default connect(mapStateToProps, { registerUser })(Register);