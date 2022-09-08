import { useEffect, useState } from 'react';
import { products } from '../utilities/products';
import delay from '../utilities/delay'
import ItemList from './ItemList';

const ItemListContainer = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        delay(products)
            .then(result => setData(result))
            .catch(err => alert(err))
    }, [])

    return (
        <>
            {
                <>
                    <ItemList items={data} />
                </>
            }
        </>
    )
}

export default ItemListContainer