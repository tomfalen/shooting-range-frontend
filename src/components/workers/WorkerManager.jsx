import React, { useState, useContext, useEffect } from 'react';
import MaterialTable from 'material-table';
import AddWorker from './AddWorker';
import WorkerDetails from './WorkerDetails';

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
import authContext from '../../store';
import workerApi from './workerApi.js';

export default function WorkerManager() {
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

  const [columns] = useState({
    columns: [
      { title: 'ID', field: 'Id', editable: 'never', hidden: 'true' },
      { title: 'Password', field: 'Password', editable: 'onAdd', hidden: 'true' },
      { title: 'Name', field: 'FirstName', editable: 'always' },
      { title: 'Surname', field: 'LastName', editable: 'always' },
      { title: 'Pesel', field: 'Pesel', editable: 'always' },
      { title: 'Birthday', field: 'Birthday', type: 'date', editable: 'always' },
      { title: 'Phone', field: 'Phone', editable: 'always' },
      { title: 'Employeed', field: 'EmployeeFrom', type: 'date', editable: 'never' },
      { title: 'Employee to', field: 'EmployeeTo', type: 'date', editable: 'never', hidden: 'true' },
      { title: 'Username', field: 'Username', editable: 'never' },
      { title: 'Email', field: 'Email', editable: 'always' }
    ],
  });
  const [{ sessionId }] = useContext(authContext);

  const [data, setData] = useState({
    data: []
  });

  useEffect(() => {
    workerApi.getWorkers(sessionId).then((response) => {
      setData({ data: response.data });
    })
      .catch((error) => {
        console.log(error)
      })
  }, []);

  const editRequest = (data) => {
    workerApi.editWorker(data, sessionId)
      .then((response) => {
        console.log(response.status)
      })
      .catch((error) => {
        console.log(error)
      })
  };

  const deleteRequest = (data) => {
    workerApi.deleteWorker(data)
      .then((response) => {
        console.log(response.status)
      })
      .catch((error) => {
        console.log(error)
      })
  };

  return (
    <div>
      <AddWorker />
      <MaterialTable
        title="Editable Example"
        columns={columns.columns}
        icons={tableIcons}
        data={data.data}
        detailPanel={[
          {
            tooltip: 'Show Name',
            render: rowData => {
              console.log(rowData.Id)
              return (
                <div>
                  <WorkerDetails value={rowData.Id} />
                </div>
              )
            },
          }
        ]}
        editable={{
          onRowUpdate: (newData, oldData) =>
            new Promise(resolve => {
                resolve();
                editRequest(newData);
                if (oldData) {
                  setData(prevState => {
                    const data = [...prevState.data];
                    data[data.indexOf(oldData)] = newData;
                    return { ...prevState, data };
                  });
                }
            }),
          onRowDelete: oldData =>
            new Promise(resolve => {
                resolve();
                deleteRequest(oldData.Id);
                setData(prevState => {
                  const data = [...prevState.data];
                  data.splice(data.indexOf(oldData), 1);
                  return { ...prevState, data };
                });
            }),
        }}
      />
    </div>
  );
}