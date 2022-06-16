/* eslint-disable no-restricted-imports */
// TODO: SWIGGY
import React, { useEffect, useState } from 'react';
import Modal from 'src/components/Modal';
import { Table } from 'antd';
import type { ColumnsType } from 'antd/lib/table';
import Loading from 'src/components/Loading';

interface MessageModalProps {
  hide: () => void;
  isOpen: boolean;
  primaryId?: string;
  annotationLayerNumber: string | number;
  pageSize: string;
}

const initialData = {
  count: 0,
  data: [
    {
      key: 1,
      comment: '',
      label: '',
      author: '',
      date: '',
    },
  ],
};

interface DataType {
  key: number;
  author: string;
  comment: string;
  label: string;
}

const columns: ColumnsType<DataType> = [
  {
    title: 'Author',
    dataIndex: 'author',
    key: 'author',
  },
  {
    title: 'Date',
    dataIndex: 'date',
    key: 'date',
  },
  {
    title: 'Label',
    dataIndex: 'label',
    key: 'label',
  },
  {
    title: 'Comment',
    dataIndex: 'comment',
    key: 'comment',
  },
];

export default function MessageModal(props: MessageModalProps) {
  const { hide, isOpen, primaryId, annotationLayerNumber, pageSize } = props;
  const [data, setData] = useState(initialData);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (primaryId) {
      setIsLoading(true);
      fetch(
        `/api/v1/annotation_layer/${annotationLayerNumber}/annotation?q=${encodeURIComponent(
          JSON.stringify({
            columns: [],
            filters: [
              {
                col: 'short_descr',
                opr: 'annotation_all_text',
                value: primaryId,
              },
            ],
            keys: ['list_columns'],
            order_column: 'changed_on_delta_humanized',
            order_direction: 'desc',
            page: 0,
            page_size: 50,
          }),
        )}`,
      )
        .then(res => res.json())
        .then(({ result, count }) => {
          setData({
            count,
            data: result.map((row: any, ind: number) => {
              const { label, comment } = JSON.parse(row.json_metadata);
              return {
                author: row.changed_by.first_name,
                label,
                comment,
                key: ind,
                date: row.changed_on_delta_humanized,
              };
            }),
          });
        })
        .catch(() => {
          alert('Something went wrong');
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [annotationLayerNumber, primaryId, isOpen]);

  return (
    <Modal
      onHide={hide}
      onHandledPrimaryAction={hide}
      show={isOpen}
      title="Feedback"
    >
      <div style={{ minHeight: '50px' }}>
        {isLoading ? (
          <Loading />
        ) : data.count > 0 ? (
          <Table
            columns={columns}
            dataSource={data.data}
            size="small"
            bordered
            pagination={{ pageSize: parseInt(pageSize, 10) }}
          />
        ) : (
          <p>No Feedback available</p>
        )}
      </div>
    </Modal>
  );
}
