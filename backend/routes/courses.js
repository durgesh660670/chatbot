const express = require('express')
const router = express.Router();
const Course = require('../models/course')
const { logger, customLogger } = require('../middleware/logger')
const verifyToken = require('../middleware/authentication')


// creating the routers

//get all the courses
router.get('/', verifyToken.verifyToken, async (req, res) => {
    try {
        const courses = await Course.find();
        logger.info('courses:' + JSON.stringify(courses))
        customLogger.info('courses:' + JSON.stringify(courses))
        res.json({ message: 'courses fetched successfully', courses: courses });
    } catch (err) {
        res.status(500).json({ message: 'Error getting courses', error: err });
    }
});


//get single course

router.get('/:id', verifyToken.verifyToken, async (req, res) => {

    try {
        const courseId = req.params.id;
        const course = await Course.findById(courseId);
        logger.info('course:' + JSON.stringify(course))
        customLogger.info('course:' + JSON.stringify(course))
        if (!course) {
            return res.status(404).json({ message: 'Course not found' });
        }
        res.json({ message: 'course fetched successfully', course: course });
    } catch (err) {
        res.status(500).json({ message: 'Error getting course', error: err });
    }
})


//delete all courses
router.delete('/', verifyToken.verifyToken, async (req, res) => {
    try {
        const result = await Course.deleteMany({});
        logger.info('result:' + JSON.stringify(result))
        customLogger.info('result:' + JSON.stringify(result))
        if (!result.deletedCount) {
            return res.status(404).json({ message: 'No courses found' });
        }
        res.json({ message: 'All courses deleted successfully', deletedCount: result.deletedCount });
    } catch (err) {
        res.status(500).json({ message: 'Error deleting courses', error: err });
    }
});

//create courses
router.post('/', verifyToken.verifyToken, async (req, res) => {

    try {
        const savedCourse = await Course.create(req.body)
        logger.info('savedCourse:' + JSON.stringify(savedCourse))
        customLogger.info('savedCourse:' + JSON.stringify(savedCourse))
        res.json(savedCourse);
    } catch (err) {
        res.status(500).json({ message: 'Error creating course', error: err });
    }
});


//delete single courses
router.delete('/:id', verifyToken.verifyToken, async (req, res) => {
    try {
        const courseId = req.params.id;
        const course = await Course.findByIdAndDelete(courseId);
        logger.info('course:' + JSON.stringify(course))
        customLogger.info('course:' + JSON.stringify(course))
        if (!course) {
            return res.status(404).json({ message: 'Course not found' });
        }
        res.json({ message: 'Course deleted successfully', course: course });
    } catch (err) {
        res.status(500).json({ message: 'Error getting course', error: err });
    }
})

//update course
router.put('/:id', verifyToken.verifyToken, async (req, res) => {
    try {
        const courseId = req.params.id;
        const updatedCourse = await Course.findByIdAndUpdate(courseId, req.body, { new: true });
        logger.info('updatedCourse:' + JSON.stringify(updatedCourse))
        customLogger.info('updatedCourse:' + JSON.stringify(updatedCourse))
        if (!updatedCourse) {
            return res.status(404).json({ message: 'Course not found' });
        }
        res.json({ message: 'Course updated successfully', updatedCourse });
    } catch (err) {
        res.status(500).json({ message: 'Error updating course', error: err });
    }
});

module.exports = {
    router
}