import { DataGrid, GridToolbar } from '@mui/x-data-grid';

const ProductTable = ({ rows, columns, ...rest }) => {
      return (
            <div style={{ height: 700, width: '100%' }}>
                  <DataGrid
                        columns={columns}
                        rows={rows}
                        components={{
                              Toolbar: GridToolbar,
                        }}
                        {...rest}
                  />
            </div>
      );
};

export default ProductTable;