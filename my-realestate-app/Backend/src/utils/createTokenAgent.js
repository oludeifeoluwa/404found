const createAgent = (agent) => {
  return { username: agent.username, agentId: agent._id , role : agent.role};
};

module.exports = createAgent;
