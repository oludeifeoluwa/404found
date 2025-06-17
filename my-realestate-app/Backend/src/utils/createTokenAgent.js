const createAgent = (agent) => {
  return { name: agent.name, agentId: agent._id};
};

module.exports = createAgent;
