import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Link, useLocation } from 'react-router-dom'
import myfetch from '../lib/myfetch'
import Typography from '@mui/material/Typography'

export default function MainMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const [authUser, setAuthUser] = React.useState(null)
  const location = useLocation()

  React.useEffect(() => {
    fetchAuthUser()
  }, [location])

  async function fetchAuthUser() {
    try {
      const result = await myfetch.get('/users/me')
      setAuthUser(result)
    }
    catch(error) {
      console.error(error)
      setAuthUser(null)
    }
  }

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        Menu
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem
          component={Link}
          to="/"
          onClick={handleClose}
        >
          Página inicial
        </MenuItem>

        <MenuItem
          component={Link}
          to="/users"
          onClick={handleClose}
          divider
        >
          Relação de usuários
        </MenuItem>

      </Menu>

      {
        authUser ?
          <>
            <Typography variant="body" sx={{ ml: 3, mr: 1 }}>
              {authUser.fullname}
            </Typography>
            <Button>Sair</Button>
          </>
        : <Button component={Link} to="/login">Entrar</Button>
      }
    </div>
  );
}
