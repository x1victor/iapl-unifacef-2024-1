import React from 'react'
import myfetch from '../lib/myfetch'
import { DataGrid } from '@mui/x-data-grid'
import Paper from '@mui/material/Paper'
import CheckBoxIcon from '@mui/icons-material/CheckBox'
import Typography from '@mui/material/Typography'

export default function UserList() {
  const [users, setUsers] = React.useState([])

  React.useEffect(() => {
    fetchData()
  }, [])

  async function fetchData() {
    try {
      const result = await myfetch.get('/users')
      setUsers(result)
    }
    catch(error) {
      console.error(error)
      alert(error.message)
    }
  }

  const columns = [
    {
      field: 'fullname',
      headerName: 'Nome completo',
      width: 250
    },
    {
      field: 'username',
      headerName: 'Nome de usuário',
      width: 150
    },
    {
      field: 'is_admin',
      headerName: 'É admin?',
      headerAlign: 'center',
      align: 'center',
      renderCell: params => (
        params.row.is_admin ? <CheckBoxIcon /> : ''
      )
    }
  ]

  return (
    <>
      <Typography variant="h2" gutterBottom>
        Relação de usuários
      </Typography>

      <Paper elevation={6} sx={{ height: 400 }}>
        <DataGrid
          rows={users}
          columns={columns}
          pageSizeOptions={[5]}
        />
      </Paper>
    </>
  )

}