import React, { useState, useContext, useEffect } from 'react';
import MaterialTable from 'material-table';
import { forwardRef } from 'react';
import AddBox from '@material-ui/icons/AddBox';
import ArrowUpward from '@material-ui/icons/ArrowUpward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';
import Axios from 'axios';
import authContext from '../../store';
import Spinner from '../spinner';

export default function MaterialTableDemo() {
  const tableIcons: Icons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => <ArrowUpward {...props} ref={ref} />),
    ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
    };
    const [ { isLoggedIn, error, sessionId }, dispatch ] = useContext(authContext);
    const [ loading, setLoading ] = useState(false);

  const [columns, setColumns] = useState({
    columns: [
      { title: 'ID', field: 'id' },   
      { title: 'Name', field: 'firstName' },
      { title: 'Surname', field: 'lastName' },
      { title: 'Pesel', field: 'pesel'  },
      { title: 'Birthday', field: 'birthday' },
      { title: 'Phone', field: 'phone'  },
      { title: 'Employee from', field: 'employeeFrom' },
      { title: 'Employee to', field: 'employeeTo' },
      { title: 'Username', field: 'username' },
      { title: 'Email', field: 'email' },
    ],
  });
  const [data, setData] = useState({
    // data: [{"id":"3","firstName":"Testowy","lastName":"Pracownik","pesel":"89123153712","birthday":"1989-12-31T00:00:00.0000000+01:00","phone":"887557336","employeeFrom":"2019-12-01T00:00:00.0000000+01:00","employeeTo":"","username":"test_worker","email":"wojciech.biegala@zhr.pl"},{"id":"1","firstName":"Aleksander","lastName":"Pracownik","pesel":"93081133763","birthday":"1993-08-11T00:00:00.0000000+02:00","phone":"558114967","employeeFrom":"2018-02-18T00:00:00.0000000+01:00","employeeTo":"","username":"admin","email":"test@gmail.com"}]
    data: []
  });

  useEffect(() => {
    console.log(sessionId);
    Axios.get("http://sokres.ddns.net:50101/worker", 
            {
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                    "Authorization": sessionId
                  }
		    })
			.then((response) => {
        console.log(response.data)
        const result = 
        [
          {"id":response.data,
          "firstName":"Testowy",
          "lastName":"Pracownik",
          "pesel":"89123153712",
          "birthday":"1989-12-31T00:00:00.0000000+01:00",
          "phone":"887557336",
          "employeeFrom":"2019-12-01T00:00:00.0000000+01:00",
          "employeeTo":"",
          "username":"test_worker",
          "email":"wojciech.biegala@zhr.pl"}
          ,{"id":"1","firstName":"Aleksander","lastName":"Pracownik","pesel":"93081133763","birthday":"1993-08-11T00:00:00.0000000+02:00","phone":"558114967","employeeFrom":"2018-02-18T00:00:00.0000000+01:00","employeeTo":"","username":"admin","email":"test@gmail.com"}]
    
        setData({data: response.data});
			})
			.catch((error) => {
				console.log(error)
			})
  }, []);

//  componentDidMount() {

//     console.log(sessionId);
// 		setLoading(true);
// // #bd0a5150-850d-44c5-bfde-97ba527be2fc
//         Axios.get("http://sokres.ddns.net:50101/worker", 
//             {
//                 headers: {
//                     "Accept": "application/json",
//                     "Content-Type": "application/json",
//                     "Authorization": sessionId
//                   }
// 		    })
// 			.then((response) => {
// 				console.log(response)
//         setState({data: response.data});
// 			})
// 			.catch((error) => {
// 				console.log(error)
// 			})
// 			.finally(() => {
// 				setLoading(false);
// 			});
// 	};
  return (
    <div>						
    <MaterialTable
      title="Editable Example"
      columns={columns.columns}
      icons={tableIcons}
      data={data.data}
      editable={{
        onRowAdd: newData =>
          new Promise(resolve => {
            console.log(newData.firstName);

            setTimeout(() => {
              resolve();
              setData(prevState => {
                const data = [...prevState.data];
                data.push(newData);
                return { ...prevState, data };
              });
            }, 600);
          }),
        onRowUpdate: (newData, oldData) =>
          new Promise(resolve => {
            setTimeout(() => {
              resolve();
              if (oldData) {
                setData(prevState => {
                  const data = [...prevState.data];
                  data[data.indexOf(oldData)] = newData;
                  return { ...prevState, data };
                });
              }
            }, 600);
          }),
        onRowDelete: oldData =>
          new Promise(resolve => {
            setTimeout(() => {
              resolve();
              setData(prevState => {
                const data = [...prevState.data];
                data.splice(data.indexOf(oldData), 1);
                return { ...prevState, data };
              });
            }, 600);
          }),
      }}
    />
  </div>
  );
}