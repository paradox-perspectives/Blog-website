import React from 'react';
import { SettingFilled, HomeOutlined} from '@ant-design/icons';
import { Button, Result } from 'antd';

const ComingSoonPage = () => {
    return (
        <Result
            icon={<SettingFilled spin/>}
            title="Page coming soon"
            subTitle="Buy exclusive articles in pdf format"
            extra={<Button type="primary"  icon={<HomeOutlined />} href={"/"}  ghost>Home</Button>}
        />
    )
}

export default ComingSoonPage;