import Home7 from '../home7.jsx'
import pshirt from'../assets/pshirt.webp'
import wshirt from '../assets/wshirt.jpg'
import Adminhomepage from "./adminhomepage";
function Delivered () {

const delist=[

{
        
        image : pshirt,
        orderid :"ORDER ID : 001",
        size :"SIZE : M",
        rate :"RATE : 499",
        name:"NAME : ARAVIND",
        address:"ADDRESS : 4th STREET , KUMBAKONAM",
        phonenum:"PHONENUM : 9626626322",
        orderdate:"ORDER DATE : 02.10.2025",
        delivereddate:"DELIVERED DATE : 03.10.2025",
        paymenttype:"PAYMENT TYPE : C O D"

    },
        {image : wshirt,
        orderid :"ORDER ID : 001",
        size :"SIZE : L",
        rate :"RATE : 499",
        name:"NAME : ARAVIND",
        address:"ADDRESS : 4th STREET , KUMBAKONAM",
        phonenum:"PHONENUM : 9626626322",
        orderdate:"ORDER DATE : 02.10.2025",
        delivereddate:"DELIVERED DATE : 03.10.2025",
        paymenttype:"PAYMENT TYPE : GPAY"

    }
]

const deliveredlist =delist.map((types) =>
    < Home7
            
            
            image={types.image}
            orderid={types.orderid}
            size={types.size}
            rate={types.rate}
            name={types.name}
            address={types.address}
            phonenum={types.phonenum}
            orderdate={types.orderdate}
            delivereddate={types.delivereddate}
            paymenttype={types.paymenttype}
            
            />
)

    return(
<div>
<Adminhomepage/>
    {deliveredlist}

</div>
    );
}
export default Delivered;