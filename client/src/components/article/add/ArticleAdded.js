import React from 'react';
import { Button, Result } from 'antd';
import { HomeOutlined} from '@ant-design/icons';


const ArticleAdded = () => {

    let title = "Article succesfully added (changes)";

    return (
        <Result
            status="success"
            title={title}
            extra={<Button type="primary" icon={<HomeOutlined />} href={"/#secure"}  ghost>Home</Button>}
        />
    )
}

export default ArticleAdded;