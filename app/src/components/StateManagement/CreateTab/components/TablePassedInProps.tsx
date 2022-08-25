import React, { useState, useContext, useEffect } from 'react';
import {
  DataGrid,
  GridEditRowsModel,
} from '@mui/x-data-grid';
import Button from '@material-ui/core/Button';
import ClearIcon from '@material-ui/icons/Clear';
import StateContext from "../../../../context/context";
import { makeStyles } from '@material-ui/core/styles';
import { StatePropsPanelProps } from '../../../../interfaces/Interfaces';

const TablePassedInProps = props => {
  const [state, dispatch] = useContext(StateContext);
  const classes = useStyles();
  const [editRowsModel] = useState<GridEditRowsModel>({});
  const [gridColumns, setGridColumns] = useState([]);
  const currentId = state.canvasFocus.componentId;
  const currentComponent = state.components[currentId - 1];
  const passedInProps = (currentComponent.name !== 'App' && currentComponent.name !== 'index')? currentComponent.passedInProps : '';

  //formatting for data grid columns
  const columnTabs = [
    {
      field: 'id',
      headerName: 'ID',
      width: 30,
      editable: false
    },
    {
      field: 'key',
      headerName: 'Key',
      width: 90,
      editable: true
    },
    {
      field: 'value',
      headerName: 'Initial Value',
      width: 100,
      editable: true
    },
    {
      field: 'type',
      headerName: 'Type',
      width: 90,
      editable: false
    },
    {
      field: 'delete',
      headerName: 'X',
      width: 30,
      editable: false,
      align: 'left',
      renderCell: function renderCell(params: any) {
        return (
          <Button
            style={{ width: `${3}px`, color: 'black'}}
            onClick={() => {
                deletePassedInProps(params.id);
            }}
          >
            <ClearIcon style={{ width: `${15}px` }} />
          </Button>
          
        );
      }
    }
  ];

  const deletePassedInProps = (rowId) => {
    // get the current focused component
    // remove the state that the button is clicked
    // send a dispatch to rerender the table
    dispatch({
      type: 'DELETE PASSEDINPROPS',
      payload: { rowId: rowId }
    });
  };

  useEffect(() => {
    setGridColumns(columnTabs);
  }, [props.isThemeLight]);

  useEffect(() => {
    if (props.canDeleteState) {
      setGridColumns(columnTabs);
    } else {
      setGridColumns(columnTabs.slice(0, gridColumns.length - 1));
    }
    
  }, [state.canvasFocus.componentId]);

  // fill data grid rows with all of the passed in props from parent component (if there are any)
  let rows = passedInProps?.slice();
  
  return (
    <div className={'state-prop-grid'}>
        <DataGrid
          rows={rows}
          columns={gridColumns}
          pageSize={5}
          editRowsModel={editRowsModel}
          className={props.isThemeLight ? classes.themeLight : classes.themeDark}
        />
    </div>
  );
};

const useStyles = makeStyles({
  themeLight: {
    color: 'rgba(0,0,0,0.54)',
    '& .MuiTablePagination-root': {
      color: 'rbga(0,0,0,0.54)'
    }
  },
  themeDark: {
    color: 'white',
    '& .MuiTablePagination-root': {
      color: 'white'
    },
    '& .MuiIconButton-root': {
      color: 'white'
    },
    '& .MuiSvgIcon-root': {
      color: 'white'
    },
    '& .MuiDataGrid-window': {
      backgroundColor: 'rgba(0,0,0,0.54)'
    }
  }
});

export default TablePassedInProps;