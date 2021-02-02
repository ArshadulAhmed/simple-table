import React from "react";
import { connect } from "react-redux";
import {
  loadItems,
  removeTableItems,
  editTableItems,
} from "../redux/actions/LoadProductsAction";
import { LoadingComponent } from "../components/LoadingComponent";

const table_heading = [
  {
    title: "Product ID",
    key: 1,
  },
  {
    title: "Title",
    key: 2,
  },

  {
    title: "Image",
    key: 3,
  },

  {
    title: "Action",
    key: 4,
  },
];

function HomePage(props) {
  const [pagination, setPagination] = React.useState(0);
  const [currentEditedRow, setCurrentEditedRow] = React.useState(null);

  React.useEffect(() => {
    props.loadItems(pagination);
  }, [pagination]);

  const deleteTableRow = (record) => {
    props.removeTableItems(record);
  };

  const editTableRow = (record) => {
    setCurrentEditedRow(record.id);
  };

  const submitEditedData = (record, e) => {
    if (!e.target.readOnly && e.target.value !== "") {
      props.editTableItems(record.id, e.target.value);
      setCurrentEditedRow(null);
    } else {
      e.target.value = record.title;
      setCurrentEditedRow(null);
    }
  };

  const { isLoadingProducts } = props;

  const handleDec = async () => {
    if (pagination !== 0) {
      setPagination(pagination - 5);
    }
  };
  const handleInc = async () => {
    setPagination(pagination + 5);
  };

  return (
    <React.Fragment>
      <div justify="center" className="main_">
        <div className="table_main">
          <table className="table_inner">
            <thead>
              <tr>
                {table_heading.map((item, key) => (
                  <th key={key}>{item.title}</th>
                ))}
              </tr>
            </thead>
            <tbody
              className={isLoadingProducts ? "loading_items" : "items_loaded"}
            >
              {isLoadingProducts ? (
                <LoadingComponent />
              ) : (
                props.homeItems &&
                props.homeItems.map((item, index) => (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>
                      <textarea
                        defaultValue={item.title}
                        readOnly={currentEditedRow === item.id ? false : true}
                        className={
                          currentEditedRow === item.id
                            ? "allow_edit textCustom"
                            : "no_edit textCustom"
                        }
                        onBlur={(e) => submitEditedData(item, e)}
                        wrap="soft"
                      />
                    </td>
                    <td>
                      <img
                        src={item.thumbnailUrl}
                        alt={item.title}
                        title={item.title}
                        className="table_data_image"
                      />
                    </td>
                    <td>
                      <button
                        onClick={() => deleteTableRow(item)}
                        className="delete_button common_button"
                      >
                        Delete Record
                      </button>
                      <button
                        onClick={() => editTableRow(item)}
                        className="edit_button common_button"
                      >
                        Edit record
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="paginationMain">
        {pagination === 0 ? null : <button onClick={handleDec}>Prev</button>}
        <button onClick={handleInc}>Next</button>
      </div>
    </React.Fragment>
  );
}

function mapStateToProps(state) {
  return {
    isLoadingProducts: state.LoadIInitialltems.isLoading,
    homeItems: state.LoadIInitialltems.data,
  };
}

const mapDispatchToProps = {
  loadItems,
  removeTableItems,
  editTableItems,
};
export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
