import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'

function Home() {

    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const respond = await axios.get('http://localhost:5000/api/products');

                setProducts(respond.data);
            }
            catch (error) {
                console.error("Product Fetching Error !!", error);
            }
        };

        fetchProducts();

    }, []);

    return (
        <div style={{ padding: '20px' }}>
            <h1>GrR E-Commerce</h1>
            <p>Beyond the Limits</p>
            <h2>Our Products</h2>

            <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', marginTop: '20px' }}>

                {
                    products.map((product) => (
                        <div key={product._id} style={{ border: '1px solid #ccc', padding: '15px', borderRadius: '8px', width: '220px' }}>
                            <img
                                src={product.image}
                                alt={product.name}
                                style={{ width: '100%', height: '150px', objectFit: 'cover', borderRadius: '5px' }}
                            />
                            <h3 style={{ fontSize: '18px', margin: '10px 0' }}>{product.name}</h3>
                            <p style={{ color: 'gray', fontSize: '14px' }}>{product.description}</p>
                            <h4 style={{ color: 'green' }}>රු. {product.price}</h4>
                            <button style={{ background: '#333', color: 'white', padding: '8px', width: '100%', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                                Add to Cart
                            </button>
                        </div>
                    ))}

                {products.length === 0 && (
                    <p>Not Any Product In A Store !</p>
                )}
            </div>

        </div >
    )
}

export default Home