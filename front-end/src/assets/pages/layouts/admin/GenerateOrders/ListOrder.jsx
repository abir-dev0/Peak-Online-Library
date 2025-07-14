import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import swal from "sweetalert";

export default function ListOrder() {
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    let isMounted = true;
    axios.get('http://127.0.0.1:8000/api/orders')
      .then(res => {
        if (isMounted) {
          if (res.data.status === 200) {
            setOrders(res.data.orders);
            setLoading(false);
          }
        }
      })
      .catch(err => {
        console.error("Error fetching orders:", err);
        setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const handleDelete = (e, orderId) => {
    e.preventDefault();
    swal({
        title: "Are you sure?",
        text: "Once deleted, you will not be able to recover this order!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    })
    .then((willDelete) => {
        if (willDelete) {
            axios.delete(`http://127.0.0.1:8000/api/delete-order/${orderId}`)
                .then(response => {
                    if (response.data.status === 200) {
                        swal("Poof! Your order has been deleted!", {
                            icon: "success",
                        });
                        setOrders(orders.filter(order => order.id !== orderId));
                    } else {
                        swal("Oops! Something went wrong. Please try again.", {
                            icon: "error",
                        });
                    }
                })
                .catch(error => {
                    console.error("There was an error deleting the order!", error);
                    swal("Oops! Something went wrong. Please try again.", {
                        icon: "error",
                    });
                });
        } else {
            swal("Your order is safe!");
        }
    });
  };

  if (loading) {
    return <div>Orders loading...</div>;
  }

  return (
    <>
      <div className="container mx-auto p-8 bg-white shadow-md rounded-lg">
        <div className="mb-6 flex justify-end">
        </div>
        <div className="flex justify-center items-center">
          <div className="w-full max-w-5xl bg-white shadow-xl rounded-xl p-6">
            <h2 className="text-2xl font-semibold text-center mb-6">Orders</h2>
            <div className="overflow-x-auto">
              <div className="flex justify-center">
                <table className="min-w-full border-collapse">
                  <thead>
                    <tr>
                      <th className="border-b-2 py-3 px-4 text-left">ID</th>
                      <th className="border-b-2 py-3 px-4 text-left">Tracking No</th>
                      <th className="border-b-2 py-3 px-4 text-left">Phone No</th>
                      <th className="border-b-2 py-3 px-4 text-left">Email</th>
                      <th className="border-b-2 py-3 px-4 text-left">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((item, index) => (
                      <tr key={index} className="border-b">
                        <td className="py-3 px-4">{item.id}</td>
                        <td className="py-3 px-4">{item.tracking_no}</td>
                        <td className="py-3 px-4">{item.phone}</td>
                        <td className="py-3 px-4">{item.email}</td>
                        <td className="py-3 px-4">
                          <button type="button" onClick={(e) => handleDelete(e, item.id)} className="px-2 py-1 bg-red-700 text-white rounded mr-2">
                            Delete
                          </button>
                          <button className="px-2 py-1 bg-yellow-400 text-white rounded mr-2">
                          <Link to={`/admin/edit-order/${item.id}`} >
                            Edit
                          </Link></button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
