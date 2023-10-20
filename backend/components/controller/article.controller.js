const Article = require("../model/artikel");
const User = require("../model/user");

const getAllArticles = async (req, res) => {
  try {
    const articles = await Article.findAll();
    res.status(200).json({ message: "List All Articles", Articles: articles });
  } catch (error) {
    console.error("Error fetching articles:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getDetailsArticle = async (req, res) => {
  try {
    const article = await Article.findByPk(req.params.articleId);
    res.status(200).json({ message: "Details one Article", Article: article });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const createOneArticle = async (req, res) => {
  const { Artikel_Title, Artikel_Content, Artikel_User } = req.body;
  const Artikel_Picture = req.file;
  try {
    const user = await User.findByPk(Artikel_User);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const article = await Article.create({
      Artikel_Title: Artikel_Title,
      Artikel_Content: Artikel_Content,
      Artikel_User: user.id,
      Artikel_Picture: Artikel_Picture.filename,
    });
    res.status(200).json({
      message: "Create one article was successful",
      Article: article,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateOneArticle = async (req, res) => {
  const { Artikel_Title, Artikel_Content } = req.body;
  const Artikel_Picture = req.file;
  try {
    const article = await Article.findByPk(req.params.articleId);
    if (!article) {
      return res.status(404).json({ message: "Article not found" });
    }

    if (Artikel_Title) {
      article.Artikel_Title = Artikel_Title;
    }

    if (Artikel_Content) {
      article.Artikel_Content = Artikel_Content;
    }

    if (Artikel_Picture) {
      article.Artikel_Picture = Artikel_Picture.filename;
    }

    await article.save();

    res.status(200).json({
      message: "Update one article was successful",
      Article: article,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const removeOneArticle = async (req, res) => {
  try {
    const article = await Article.findByPk(req.params.articleId);
    if (!article) {
      return res.status(404).json({ message: "Article not found" });
    }
    await article.destroy();

    res.status(200).json({ message: "Remove one article was successful" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getAllArticles,
  getDetailsArticle,
  createOneArticle,
  updateOneArticle,
  removeOneArticle,
};
