import React, { useMemo } from 'react';
import { Button, Modal, Typography, Card, Space, Badge, Tooltip } from 'antd';
import { ClockCircleOutlined, CalendarOutlined, CheckCircleOutlined, UserOutlined } from '@ant-design/icons';
import { IElection, ICandidate } from '@/types';

const { Text, Title, Paragraph } = Typography;

interface VoteModalProps {
  visible: boolean;
  onClose: () => void;
  election: IElection | null;
  onVote: (electionId: string, candidateId: string) => void;
  votedCandidateId?: string;
}

// Helper function to calculate time left
const calculateTimeLeft = (endDateString: string): string => {
  const now = new Date();
  const endDate = new Date(endDateString);
  
  if (now > endDate) return "Ended";
  
  const diffMs = endDate.getTime() - now.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  const diffHours = Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  
  if (diffDays > 0) {
    return `${diffDays} day${diffDays !== 1 ? 's' : ''} ${diffHours} hour${diffHours !== 1 ? 's' : ''}`;
  } else if (diffHours > 0) {
    const diffMinutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
    return `${diffHours} hour${diffHours !== 1 ? 's' : ''} ${diffMinutes} minute${diffMinutes !== 1 ? 's' : ''}`;
  } else {
    const diffMinutes = Math.floor(diffMs / (1000 * 60));
    return diffMinutes <= 0 
      ? "Less than a minute" 
      : `${diffMinutes} minute${diffMinutes !== 1 ? 's' : ''}`;
  }
};

// Format date in a readable way
const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString(undefined, { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });
};

const VoteModal: React.FC<VoteModalProps> = ({ 
  visible, 
  onClose, 
  election, 
  onVote,
  votedCandidateId 
}) => {
  const timeLeft = useMemo(() => {
    if (!election?.endDate) return null;
    return calculateTimeLeft(election.endDate);
  }, [election?.endDate]);

  const formattedEndDate = useMemo(() => {
    if (!election?.endDate) return null;
    return formatDate(election.endDate);
  }, [election?.endDate]);

  if (!election) {
    return (
      <Modal
        title="Election Voting"
        open={visible}
        onCancel={onClose}
        footer={null}
      >
        <p>No election selected.</p>
      </Modal>
    );
  }

  const hasVoted = !!votedCandidateId;
  
  return (
    <Modal
      title={
        <div className="flex justify-between items-center">
          <span>{election.title}</span>
          {hasVoted && (
            <Badge 
              color="green" 
              text={
                <Space>
                  <CheckCircleOutlined />
                  <span>Voted</span>
                </Space>
              }
            />
          )}
        </div>
      }
      open={visible}
      onCancel={onClose}
      footer={null}
      width={600}
      className="vote-modal"
    >
      <div className="space-y-4">
        <Paragraph>{election.description}</Paragraph>
        
        <Space direction="horizontal" size="middle" className="mb-4">
          {formattedEndDate && (
            <Space size={4}>
              <CalendarOutlined className="text-primary" />
              <Text type="secondary">Ends: {formattedEndDate}</Text>
            </Space>
          )}
          
          {timeLeft && (
            <Space size={4}>
              <ClockCircleOutlined className="text-primary" />
              <Text type="secondary">Time left: {timeLeft}</Text>
            </Space>
          )}
          
          <Space size={4}>
            <UserOutlined className="text-primary" />
            <Text type="secondary">Candidates: {election.candidate?.length || 0}</Text>
          </Space>
        </Space>
        
        <Title level={5} className="mb-3">Candidates</Title>
        
        <Space direction="vertical" size="middle" className="w-full">
          {election.candidate?.map((cand: ICandidate) => {
            const isVoted = votedCandidateId === cand.id;
            
            return (
              <Card 
                key={cand.id} 
                className={`w-full ${isVoted ? 'border-primary' : ''}`}
                bordered
                hoverable
              >
                <div className="flex justify-between items-start">
                  <div>
                    <Title level={5} style={{ marginTop: 0, marginBottom: 8 }}>{cand.name}</Title>
                    <Paragraph type="secondary" style={{ marginBottom: 4 }}>{cand.description}</Paragraph>
                    <Text type="secondary" className="text-xs">{cand.voteCount} votes</Text>
                  </div>
                  
                  <Tooltip title={!election.isActive ? "Voting is closed" : isVoted ? "Already voted" : "Cast your vote"}>
                    <Button
                      type={isVoted ? "default" : "primary"}
                      size="middle"
                      onClick={() => {
                        onVote(election.id, cand.id);
                        onClose();
                      }}
                      disabled={!election.isActive || hasVoted}
                      icon={isVoted ? <CheckCircleOutlined /> : null}
                    >
                      {isVoted ? "Voted" : "Vote"}
                    </Button>
                  </Tooltip>
                </div>
              </Card>
            );
          })}
        </Space>
      </div>
    </Modal>
  );
};

export default VoteModal;