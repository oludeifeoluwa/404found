const createAgent = (agent) => {
  return { name: agent.name, agentId: agent._id , role : agent.role};
};

module.exports = createAgent;
