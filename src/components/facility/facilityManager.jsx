import React, { useState, useContext, useEffect } from 'react';
import MaterialTable from 'material-table';
import AxisDetails from './axisDetails'

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
import facilityApi from './facilityApi.js';

export default function FacilityManager() {
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
      { title: 'Name', field: 'Name', editable: 'onAdd' },
      { title: 'Length', field: 'Length', editable: 'onAdd' },
      { title: 'AllowRimfire', field: 'AllowRimfire', type: 'boolean', editable: 'onAdd' },
      { title: 'AllowCenterfire', field: 'AllowCenterfire', type: 'boolean', editable: 'onAdd' },
      { title: 'AllowShell', field: 'allowShell', type: 'boolean', editable: 'onAdd' },
      { title: 'isOpen', field: 'IsOpen', type: 'boolean', editable: 'onAdd' },
      { title: 'numberOfFields', field: 'NumberOfFields', type: 'number', editable: 'onAdd' },
      { title: 'Number', field: 'Number', editable: 'never' },
    ],
  });
  const [holidaysColumns] = useState({
    columns: [
        { title: 'Id', field: 'Id', editable: 'never', hidden: true },
        { title: 'From', field: 'From', type: 'date', editable: 'onAdd' },
        { title: 'To', field: 'To', type: 'date', editable: 'onAdd' },
        { title: 'Reason', field: 'Reason', editable: 'onAdd' },
    ],
});
  const [{ sessionId }] = useContext(authContext);

  const [data, setData] = useState({
    data: []
  });
  const [holidays, setHolidays] = useState({
    data: []
  });

  useEffect(() => {
    facilityApi.getAxis(sessionId).then((response) => {
      setData({ data: response.data });
    })
      .catch((error) => {
        console.log(error)
      }).finally(() => {
        facilityApi.getObjectHolidays()
        .then((response) => {
            setHolidays({ data: response.data });
        }).catch((error) => {
        console.log(error)
    })
      })
  }, []);

  const addRequest = (data) => {
    facilityApi.AddAxis(data, sessionId)
      .then((response) => {
        console.log(response)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const deleteRequest = (data) => {
    facilityApi.deleteAxis(data, sessionId)
      .then((response) => {
        console.log(response)
      })
      .catch((error) => {
        console.log(error)
      })
  };

  const addHolidaysRequest = (data) => {
  facilityApi.addHolidays(data, sessionId)
    .then((response) => {
      console.log(response)
    })
    .catch((error) => {
      console.log(error)
    })
}

const deleteHolidaysRequest = (data) => {

  facilityApi.deleteHolidays(data, sessionId)
    .then((response) => {
      console.log(response)
    })
    .catch((error) => {
      console.log(error)
    })
};

  return (
    <div>
      <div class="workerList">
      <MaterialTable
        title="Axis list"
        columns={columns.columns}
        icons={tableIcons}
        data={data.data}
        detailPanel={[
          {
            tooltip: 'Show Name',
            render: rowData => {
              return (
                <div>
                  <AxisDetails value={rowData.Id} />
                </div>
              )
            },
          }
        ]}
        editable={{
            onRowAdd: newData =>
            new Promise(resolve => {
              addRequest(newData);
              setData(prevState => {
                const data = [...prevState.data];
                console.log(data);

                data.push(newData);
                return { ...prevState, data };
              });
              resolve();
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
      <div class="workerList">
      <MaterialTable
        title="Holidays list"
        columns={holidaysColumns.columns}
        icons={tableIcons}
        data={holidays.data}
        editable={{
            onRowAdd: newData =>
            new Promise(resolve => {
                addHolidaysRequest(newData);
              setHolidays(prevState => {
                const data = [...prevState.data];
                console.log(data);

                data.push(newData);
                return { ...prevState, data };
              });
              resolve();
            }),
          onRowDelete: oldData =>
            new Promise(resolve => {
                resolve();
                deleteHolidaysRequest(oldData.Id);
                setHolidays(prevState => {
                  const data = [...prevState.data];
                  data.splice(data.indexOf(oldData), 1);
                  return { ...prevState, data };
                });
            }),
        }}
      />
      </div>
    </div>
  );
}