export default function RowsDetails(props) {

    const { title, value, isImg } = props;
    return (



        <tr>
            <th>{title}</th>
            {isImg ? <td><img src={value} style={{ height: 25, width: 25 }} /></td> :
                <td>{value}</td>
            }
        </tr>






    );
}
