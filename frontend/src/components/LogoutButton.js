import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import '../styles/login_page.css'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

  axios.defaults.xsrfCookieName = 'csrftoken';
  axios.defaults.xsrfHeaderName = 'X-CSRFToken';
  axios.defaults.withCredentials = true;

  const client = axios.create({
    baseURL: 'http://127.0.0.1:8000'
  })

function LogoutButton() {
  const navigate = useNavigate();
    function submitLogout(e) {
        e.preventDefault();
        client.post(
          '/api/logout',
          {withCredentials: true}
        ).then(function(res) {       
          localStorage.clear();
          localStorage.setItem('currentUser', false);
          sessionStorage.clear();
          navigate("/");
        });
      }

    return (
      <Form onSubmit={e => submitLogout(e)}>
        <Button variant="info" type="submit">
          Выйти
        </Button>
      </Form>
    );
}

export default LogoutButton;