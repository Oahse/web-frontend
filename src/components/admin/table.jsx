import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Pagination from '@/components/admin/pagination';
import ListSearch from '@/components/admin/form/ListSearch';
import { ToastContainer, toast } from 'react-toastify';
import Toast from '@/components/Toast';
import { formatToMMMDDYYYY } from '@/services/helper';

const AdminTable = ({ items = [], showImages=true, handleDelete, columns, linkUrl, deletecaller }) => {
    const navigate = useNavigate();
    const [localItems, setLocalItems] = useState(items);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(2);
    const [selectedIds, setSelectedIds] = useState([]);
    const [filteredItems, setFilteredItems] = useState([]);
  
    useEffect(() => {
      setLocalItems(items); // sync with props if items change
    }, [items]);
  
    const totalPages = Math.ceil(localItems.length / itemsPerPage);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = localItems.slice(indexOfFirstItem, indexOfLastItem);
    const isAllSelected = currentItems.every(item => selectedIds.includes(item.id));
    // const columnFields = columns.map(col => col.field);
  
    const formatItem = (item) => {
    //   const formatted = {};
    //   columnFields.forEach(field => {
    //     formatted[field] = item[field];
    //   });
    //   formatted.id = item.id;
    //   formatted.image = item.image;
    //   formatted.title = item.title;
      return item;
    };
  
    useEffect(() => {
      setFilteredItems(currentItems.map(formatItem));
    }, [localItems, currentPage, itemsPerPage]);
  

  const toggleSelectAll = () => {
    const idsOnPage = currentItems.map(item => item.id);
    if (isAllSelected) {
      setSelectedIds(prev => prev.filter(id => !idsOnPage.includes(id)));
    } else {
      setSelectedIds(prev => [...new Set([...prev, ...idsOnPage])]);
    }
  };

  const toggleSelectItem = (id) => {
    setSelectedIds(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const handleClick = (item) => {
    // console.log(`${linkUrl}${item.id},-----`)
    navigate(`${linkUrl}${item.id}`, { state: { item: item } });
  };

  const handleBulkDelete = async () => {
    const toDeleteIds = [...selectedIds];
    setSelectedIds([]);
  
    try {
      const deletePromises = toDeleteIds.map(id =>
        deletecaller({ id })
          .then(result => {
            if (!result.error) {
                // Update local state
                const updatedItems = localItems.filter(item => !toDeleteIds.includes(item.id));
                setLocalItems(updatedItems);
            
                // Adjust pagination
                const newTotalPages = Math.ceil(updatedItems.length / itemsPerPage);
                setCurrentPage(prev => Math.min(prev, newTotalPages || 1));
                toast.success(<Toast title={result.message} />);
                if (handleDelete) handleDelete(id);
            } else {
              toast.error(<Toast title={result.error} subtitle="Something went wrong." />);
            }
          })
          .catch(error => {
            toast.error(<Toast title={error.message || 'Error'} subtitle="An error occurred." />);
          })
      );
  
      await Promise.all(deletePromises);
  
      
  
    } catch (err) {
      toast.error(<Toast title="Unexpected Error" subtitle={`Bulk deletion failed. ${err}`} />);
    }
  };

    const handleFilterItems =(searchQuery)=>{
        const normalizedQuery = searchQuery.trim().toLowerCase();

        const updatedItems = items.filter(item =>
        Object.values(item).some(value =>
            typeof value === 'string' && value.toLowerCase().includes(normalizedQuery)
        )
        );

        setLocalItems(updatedItems);

        const newTotalPages = Math.ceil(updatedItems.length / itemsPerPage);
        setCurrentPage(prev => Math.min(prev, newTotalPages || 1));
    }
  

  return (
    <>
      <div className="flex items-center justify-between gap10 flex-wrap">
        <div className="wg-filter flex-grow">
          <div className="show">
            <div className="text-tiny">Showing</div>
            <div className="select">
              <select
                value={itemsPerPage}
                onChange={(e) => {
                  setItemsPerPage(Number(e.target.value));
                  setCurrentPage(1);
                }}
              >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={20}>20</option>
                <option value={30}>30</option>
                <option value={50}>50</option>
              </select>
            </div>
            <div className="text-tiny">entries</div>
          </div>
          <ListSearch onSearch={handleFilterItems}/>
        </div>

        {selectedIds.length > 0 && (
          <button
            className="btn btn-danger tf-button"
            style={{ backgroundColor: '#dc3545', borderColor: '#dc3545', color: '#fff' }}
            onClick={handleBulkDelete}
          >
            Delete Selected ({selectedIds.length})
          </button>
        )}

        
        {linkUrl.includes('order')?
        <Link to={`${linkUrl}export`} className="text-decoration-none tf-button style-1 w208">
        <i className="icon-file-text"></i>Export all order
        </Link>
        :
        <Link to={`${linkUrl}add`} className="text-decoration-none tf-button style-1 w208">
          <i className="icon-plus"></i> Add new
        </Link>
        }
        
        
      </div>

      <div className="wg-table table-all-attribute">
            <ul className="table-title flex gap20 mb-14">
                {columns.map((col, index) =>
                    (col.field === 'title' || col.field === 'name') ? (
                    <li key={index} className="flex items-center">
                        <input
                            type="checkbox"
                            checked={isAllSelected}
                            onChange={toggleSelectAll}
                        />
                        <div className="body-title mx-2">{col.title || col.name}</div>
                    </li>
                    ) : (
                    <li key={index}><div className="body-title">{col.title || col.name}</div></li>
                    )
                )}
            </ul>

        <ul className="flex flex-column">
            {filteredItems.map((item) => (
                <li
                    key={item.id}
                    className="cursor-pointer attribute-item item-row flex items-center justify-between gap20"
                    onClick={(e) => {
                        if (e.target.type !== 'checkbox') handleClick(item);
                    }}
                >
                    {columns.map((col) =>
                        (col.field === 'title' || col.field === 'name') ? (
                        <div key={col.field} className="name flex items-center">
                            <input
                                type="checkbox"
                                checked={selectedIds.includes(item.id)}
                                onChange={() => toggleSelectItem(item.id)}
                                onClick={(e) => e.stopPropagation()}
                            />
                            {(item.images && showImages) && <div className="image mx-2">
                            <img src={Array.isArray(item.images) ? item.images[0] : ''} alt={item.title || item.name} />
                            </div>}
                            <div className="title line-clamp-2 mb-0 ms-2">
                            <span className="body-text">{item.title || item.name}</span>
                            </div>
                        </div>
                        ) : (
                        <div key={col.field} className="body-text text-main-dark mt-4">
                            {item[col.field]===true?<div className="block-tracking bg-1">{col.field}</div>:
                            item[col.field]==='Pending'?<div className="block-pending bg-1">{item[col.field]}</div>:
                            (item[col.field]==='Success' || item[col.field]==='In Stock')?<div className="block-available bg-1">{item[col.field]}</div>:
                            (item[col.field]==='Out of stock')?<div className="block-stock bg-1">{item[col.field]}</div>:
                            (String(col.field)?.toLowerCase().includes('date') || String(col.field)?.toLowerCase().includes('create'))?<div className=" ">{formatToMMMDDYYYY(String(item[col.field]))}</div>:
                            <>{item[col.field]}</>
                            }
                            
                        </div>
                        )
                    )}
                </li>
            ))}
        </ul>
      </div>

      <div className="divider"></div>
      <ToastContainer />

      <div className="flex items-center justify-between flex-wrap gap10">
        <div className="text-tiny">
          Showing {Math.min(indexOfFirstItem + 1, items.length)} to {Math.min(indexOfLastItem, items.length)} of {items.length} entries
        </div>
        {selectedIds.length > 0 && (
          <button
            className="btn btn-danger tf-button"
            style={{ backgroundColor: '#dc3545', borderColor: '#dc3545', color: '#fff' }}
            onClick={handleBulkDelete}
          >
            Delete Selected ({selectedIds.length})
          </button>
        )}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>
    </>
  );
};

export default AdminTable;
