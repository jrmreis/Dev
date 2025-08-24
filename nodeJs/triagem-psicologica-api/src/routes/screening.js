// Updated Routes (routes/screening.js)
export const setupScientificRoutes = (app: Express) => {
  const questionRepository = new CompleteScientificQuestionRepository();
  const scoringService = new ScientificScoringService();
  const interpretationService = new ScientificInterpretationService();
  const questionService = new ScientificQuestionService(questionRepository, scoringService, interpretationService);
  const controller = new ScreeningController(questionService, notionService);

  // Get scientific questions for a screening type
  app.get('/api/questions/:screeningType', controller.getQuestions.bind(controller));
  
  // Calculate results with scientific scoring
  app.post('/api/results/:sessionId', controller.calculateResults.bind(controller));
  
  // Get question set metadata
  app.get('/api/questionsets', async (req, res) => {
    const questionSets = await questionRepository.getAllQuestionSets();
    res.json({
      success: true,
      data: questionSets.map(qs => ({
        id: qs.id,
        name: qs.name,
        description: qs.description,
        scientificBasis: qs.scientificBasis,
        totalQuestions: qs.totalQuestions,
        estimatedTime: qs.estimatedTime
      }))
    });
  });
};
